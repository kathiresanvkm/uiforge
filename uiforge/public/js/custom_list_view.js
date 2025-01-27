$(document).on('app_ready', function() {
    const doctypes = frappe.boot.get_doctypes;
    $.each(doctypes, function(i, doctype) {
            frappe.listview_settings[doctype] = {
                onload: function (listview) {
                    // Logic to execute when the List View is loaded
                    console.log(doctype + " List View Loaded");
        
                    // Example: Add a custom button in the List View
                    listview.page.add_inner_button(__('Custom Action'), function () {
                        frappe.msgprint(__('Custom Action executed for ' + doctype));
                    });
                }
            }
                
            
            
    });
});