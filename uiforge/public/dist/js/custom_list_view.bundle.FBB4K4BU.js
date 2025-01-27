(()=>{frappe.provide("frappe.views");frappe.views.ListView=class extends frappe.views.ListView{get_list_row_html(e){let t=super.get_list_row_html(e),s=$(`<div>${t}</div>`),n=`
            <button class="btn btn-xs btn-warning custom-row-btn" 
                    data-name="${e.name}" 
                    style="margin-left: 110px;">
                ${__("View")}
            </button>
        `;return s.html()}setup_events(){super.setup_events(),this.$result.on("click",".custom-row-btn",e=>{let t=$(e.currentTarget).data("name");t&&(frappe.show_alert({message:__(`Hi, you have a new message: ${t}`),indicator:"green"},5),$(".frappe-alert").css({position:"fixed",top:"10px",left:"50%",transform:"translateX(-50%)","z-index":"9999"}),frappe.set_route("Form",this.doctype,t))})}};})();
//# sourceMappingURL=custom_list_view.bundle.FBB4K4BU.js.map
