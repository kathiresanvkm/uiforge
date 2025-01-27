$(document).on('app_ready', function () {
    const doctypes = frappe.boot.get_doctypes;
    // frappe.ui.form.controller
    // console.log(doctypes)
    frappe.ui.form.on("User", "onload", function(frm) {
        if (!frm.doc.desk_theme) { // Check if the desk_theme field is not set
            // frm.set_df_property("desk_theme", "options", ["Dark", "Light", "Automatic", "Custom Theme"]);
            frm.set_value("desk_theme", "modern_ui_theme");  // Set default to "Custom Theme" if it's not already set
            frm.refresh_field("desk_theme");
        }
    })
    $.each(doctypes, function (i, doctype) {
        frappe.ui.form.on(doctype, {
            refresh: function (frm) {
                // Hide standard buttons and actions
                $(".menu-btn-group").hide();
                $(".actions-btn-group").hide();
                $(".standard-actions.flex").hide();
                $("button[data-original-title=Print]").hide();

                // Remove a specific button and add a 'Back' button
                frm.remove_custom_button('Quotation', 'Get Items From');
                frm.add_custom_button(__('Back'), function () {
                    frappe.set_route('List', doctype);
                }).css({
                    "color": "white",
                    "background-color": "#c2c2d6",
                    "font-weight": "800"
                });

                // Add help box for mandatory fields with errors
                setTimeout(() => {
                    updateOrAddHelpBoxForErrors(frm);
                }, 50);
            }
        });
    });
});

function updateOrAddHelpBoxForErrors(frm) {
    // Find all mandatory fields in the form
    const errorFields = frm.fields_dict;

    Object.values(errorFields).forEach(field => {
        if (field.df.reqd) {
            const wrapper = field.wrapper.querySelector('.control-input-wrapper');
            if (wrapper) {
                let helpBox = wrapper.querySelector('.help-box');
                
                if (helpBox) {
                    helpBox.textContent = 'This field is mandatory and must be filled correctly.';
                    helpBox.style.color = 'red'; // Highlight error message
                } else {
                    helpBox = document.createElement('p');
                    helpBox.className = 'help-box small text-muted';
                    helpBox.textContent = 'This field is mandatory and must be filled correctly.';
                    helpBox.style.color = 'red'; // Highlight error message
                    helpBox.style.fontSize = '12px';
                    wrapper.appendChild(helpBox);
                }
            }
        }
    });
}
