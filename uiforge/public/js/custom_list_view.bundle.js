frappe.provide("frappe.views");

frappe.views.ListView = class CustomListView extends frappe.views.ListView {
    get_list_row_html(doc) {
        // Call the original method to get the default row HTML
        const row_html = super.get_list_row_html(doc);
        const $row = $(`<div>${row_html}</div>`);
        // Add a custom button to the row
        const button_html = `
            <button class="btn btn-xs btn-warning custom-row-btn" 
                    data-name="${doc.name}" 
                    style="margin-left: 110px;">
                ${__("View")}
            </button>
        `;

        // const $level_right = $row.find('.level-right');
        // $level_right.empty();  // Remove all other contents in the level-right
        // $level_right.append(button_html);  // Append the custom button

        return $row.html();
    }
    setup_events() {
        // Call the parent setup_events method
        super.setup_events();

        // Bind click event to the custom button
        this.$result.on("click", ".custom-row-btn", (event) => {
            const name = $(event.currentTarget).data("name");

            if (name) {
                frappe.show_alert({
                    message:__(`Hi, you have a new message: ${name}`),
                    indicator:'green'
                }, 5);
                $('.frappe-alert').css({
                    'position': 'fixed',
                    'top': '10px',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'z-index': '9999'
                });
                frappe.set_route("Form", this.doctype, name);
            }
        });
    }

    
};


