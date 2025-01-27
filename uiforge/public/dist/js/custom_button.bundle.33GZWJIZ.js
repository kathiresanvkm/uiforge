(()=>{$(document).on("app_ready",function(){$.each(["Opportunity","Quotation","Supplier Quotation","Sales Invoice","Delivery Note","Sales Order","Purchase Invoice","Purchase Receipt","Purchase Order"],function(s,e){frappe.listview_settings[e]={onload:function(a){console.log(e+" List View Loaded"),a.page.add_inner_button(__("Custom Action"),function(){frappe.msgprint(__("Custom Action executed for "+e))})}}})});$(document).on("app_ready",function(){let s=frappe.boot.get_doctypes;console.log(s),$.each(s,function(e,a){frappe.ui.form.on(a,{refresh:function(t){$(".menu-btn-group").hide(),$(".actions-btn-group").hide(),$(".standard-actions.flex").hide(),$("button[data-original-title=Print]").hide(),t.remove_custom_button("Quotation","Get Items From"),t.add_custom_button(__("Back"),function(){frappe.set_route("List",a)}).css({color:"white","background-color":"#c2c2d6","font-weight":"800"}),setTimeout(()=>{d(t)},50)}})})});function d(s){let e=s.fields_dict;Object.values(e).forEach(a=>{if(a.df.reqd){let t=a.wrapper.querySelector(".control-input-wrapper");if(t){let o=t.querySelector(".help-box");o?(o.textContent="This field is mandatory and must be filled correctly.",o.style.color="red"):(o=document.createElement("p"),o.className="help-box small text-muted",o.textContent="This field is mandatory and must be filled correctly.",o.style.color="red",o.style.fontSize="12px",t.appendChild(o))}}})}var r=class extends frappe.ui.form.States{show_actions(){var e=!1,a=this;if(this.frm.doc.__unsaved===1)return;function t(o){let n=!1,i=frappe.session.user;return(i==="Administrator"||o.allow_self_approval||i!==a.frm.doc.owner)&&(n=!0),n}frappe.workflow.get_transitions(this.frm.doc).then(o=>{this.frm.page.clear_actions_menu(),o.forEach(n=>{frappe.user_roles.includes(n.allowed)&&t(n)&&(e=!0,console.log(n),a.frm.add_custom_button(__(n.action),function(){console.log(n,a.frm.doc)}).addClass("btn-success").removeClass("btn-default"))}),this.setup_btn(e)})}};frappe.ui.form.States=r;frappe.ui.ThemeSwitcher=class extends frappe.ui.ThemeSwitcher{constructor(){super()}fetch_themes(){return console.log("tested"),new Promise(e=>{this.themes=[{name:"light",label:"Frappe Light",info:"Light Theme"},{name:"modern_ui_theme",label:"Maze UI",info:"Custom Theme"},{name:"automatic",label:"Automatic",info:"Uses system's theme to switch between light and dark mode"}],e(this.themes)})}};frappe.templates.navbar=`<div class="sticky-top">
<div class="fixed_sidebar"></div>
<header class="navbar navbar-expand" role="navigation">
    <div class="container">
        <a class="navbar-brand navbar-home" href="/app">
            <img
                class="app-logo"
                src="{{ frappe.boot.app_logo_url }}"
                alt="{{ __("App Logo") }}"
            >
        </a>
        <ul class="nav navbar-nav d-none d-sm-flex" id="navbar-breadcrumbs"></ul>
        <div class="collapse navbar-collapse justify-content-end">
            <form class="form-inline fill-width justify-content-end" role="search" onsubmit="return false;">
                {% if (frappe.boot.read_only) { %}
                    <span class="indicator-pill yellow no-indicator-dot" title="{%= __("Your site is undergoing maintenance or being updated.") %}">
                        {%= __("Read Only Mode") %}
                    </span>
                {% } %}
                {% if (frappe.boot.user.impersonated_by) { %}
                    <span class="indicator-pill red no-indicator-dot" title="{%= __("You are impersonating as another user.") %}">
                        {%= __("Impersonating {0}", [frappe.boot.user.name]) %}
                    </span>
                {% } %}
                <div class="input-group search-bar text-muted hidden">
                    <input
                        id="navbar-search"
                        type="text"
                        class="form-control"
                        placeholder="{%= __('Search or type a command ({0})', [frappe.utils.is_mac() ? '\u2318 + G' : 'Ctrl + G']) %}"
                        aria-haspopup="true"
                    >
                    <span class="search-icon">
                        <svg class="icon icon-sm"><use href="#icon-search"></use></svg>
                    </span>
                </div>
            </form>
            <ul class="navbar-nav">
                <li class="nav-item dropdown dropdown-notifications dropdown-mobile hidden">
                    <button
                        class="btn-reset nav-link notifications-icon text-muted"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span class="notifications-seen">
                            <span class="sr-only">{{ __("No new notifications") }}</span>
                            <svg class="es-icon icon-sm" style="stroke:none;"><use href="#es-line-notifications"></use></svg>
                        </span>
                        <span class="notifications-unseen">
                            <span class="sr-only">{{ __("You have unseen notifications") }}</span>
                            <svg class="es-icon icon-sm"><use href="#es-line-notifications-unseen"></use></svg>
                        </span>
                    </button>
                    <div class="dropdown-menu notifications-list dropdown-menu-right" role="menu">
                        <div class="notification-list-header">
                            <div class="header-items"></div>
                            <div class="header-actions"></div>
                        </div>
                        <div class="notification-list-body">
                            <div class="panel-notifications"></div>
                            <div class="panel-events"></div>
                            <div class="panel-changelog-feed"></div>
                        </div>
                    </div>
                </li>
                <li class="nav-item dropdown dropdown-message dropdown-mobile hidden">
                    <button
                        class="btn-reset nav-link notifications-icon text-muted"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        <span>
                            <svg class="es-icon icon-sm"><use href="#es-line-chat-alt"></use></svg>
                        </span>
                    </button>
                </li>
                <li class="vertical-bar d-none d-sm-block"></li>
                <li class="nav-item dropdown dropdown-help dropdown-mobile d-none d-lg-block">
                    <button
                        class="btn-reset nav-link"
                        data-toggle="dropdown"
                        aria-controls="toolbar-help"
                        aria-label="{{ __("Help Dropdown") }}"
                    >
                        <span>
                            {{ __("Help") }}
                            <svg class="es-icon icon-xs"><use href="#es-line-down"></use></svg>
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" id="toolbar-help" role="menu">
                        <div id="help-links"></div>
                        <div class="dropdown-divider documentation-links"></div>
                        {% for item in navbar_settings.help_dropdown %}
                            {% if (!item.hidden) { %}
                                {% if (item.route) { %}
                                    <a class="dropdown-item" href="{{ item.route }}">
                                        {%= __(item.item_label) %}
                                    </a>
                                {% } else if (item.action) { %}
                                    <button class="btn-reset dropdown-item" onclick="return {{ item.action }}">
                                        {%= __(item.item_label) %}
                                    </button>
                                {% } else { %}
                                    <div class="dropdown-divider"></div>
                                {% } %}
                            {% } %}
                        {% endfor %}
                    </div>
                </li>
                <li class="nav-item dropdown dropdown-navbar-user dropdown-mobile">
            
                <div class="dv-user-info">
                <p class="user-name"></p>
                </div>

                </li>
                <li class="nav-item dropdown dropdown-navbar-user dropdown-mobile">
                
                    <button
                        class="btn-reset nav-link"
                        data-toggle="dropdown"
                        aria-label="{{ __("User Menu") }}"
                    >
                        {{ avatar }}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" id="toolbar-user" role="menu">
                        {% for item in navbar_settings.settings_dropdown %}
                            {% if (!item.hidden) { %}
                                {% if (item.route) { %}
                                    <a class="dropdown-item" href="{{ item.route }}">
                                        {%= __(item.item_label) %}
                                    </a>
                                {% } else if (item.action) { %}
                                    <button class="btn-reset dropdown-item" onclick="return {{ item.action }}">
                                        {%= __(item.item_label) %}
                                    </button>
                                {% } else { %}
                                    <div class="dropdown-divider"></div>
                                {% } %}
                            {% } %}
                        {% endfor %}
                    </div>
                </li>
            </ul>
        </div>
    </div>
</header>

{% if !localStorage.getItem("dismissed_announcement_widget") && strip_html(navbar_settings.announcement_widget) != '' %}
<div class="announcement-widget form-message p-2 m-0" style="position: relative; z-index: -1; border-radius: 0; background-color: var(--bg-blue);">
    <div class="container flex justify-between align-center mx-auto">
        {{ navbar_settings.announcement_widget }}
        <div class="close-message p-0 mr-2" style="position: relative;">
        {{ frappe.utils.icon("close") }}
        </div>
    </div>
</div>
{% endif %}

</div>
`;frappe.ui.toolbar.Toolbar=class extends frappe.ui.toolbar.Toolbar{constructor(e){super(e);let a=frappe.get_cookies(),t=document.querySelector(".user-name"),o=document.querySelector(".user-status"),n=frappe.get_cookies();frappe.db.get_value("User",n.user_id,"user_type",function(i){let l="";n.user_id==="Administrator"?l=__("Administrator"):l=i.user_type?__(i.user_type):__("User"),t.textContent=a.full_name||"Guest"}),this.add_custom_sidebar()}add_custom_sidebar(){var e=$(".fixed_sidebar");this.sidebar=$(this.custom_sidebar_html()).appendTo(e);let a=document.querySelectorAll(".arrow");for(var t=0;t<a.length;t++)a[t].addEventListener("click",o=>{o.target.parentElement.parentElement.classList.toggle("showMenu")})}custom_sidebar_html(){var e=`
		<div class="sidebar">
        <button class="toggle-btn">\u2630</button>
        <ul class="nav-links">`;return $.each(frappe.boot.custom_workspace.pages,function(a,t){e+=`<li>
				<div class="icon-link">
                <div class="sidebar-title">
				<a href="/app/${t.public?frappe.router.slug(t.title):"private/"+frappe.router.slug(t.title)}">
					<i class='${__(t.custom_custom_icon)}'style="color: #FFD43B;"></i>
					<span class="link_name">${__(t.title)}</span>
				  </a>
                </div>`,t.submenu&&(e+=`<i class='fa fa-chevron-down arrow' style="min-width: 40px;"></i>`),e+="</div>"+t.submenu+"</li>"}),e+="</ul></div>",e}};frappe.ui.toolbar.Toolbar=class extends frappe.ui.toolbar.Toolbar{constructor(){super(),this.languageList=null,this.fetchLanguages()}fetchLanguages(){frappe.call({method:"frappe.client.get_list",args:{doctype:"Language",fields:["language_name","language_code"],filters:{language_code:["in",["en","ta"]]},limit_page_length:0},callback:e=>{e.message&&(this.languageList=e.message,this.make())}})}make(){super.make(),this.languageList&&$("#languageDropdown").length===0&&this.add_custom_button()}add_custom_button(){if($("#languageDropdown").length===0){let e=$(`
                <div class="dropdown">
                    <button class="dropbtn">Select Language</button>
                    <ul class="dropdown-content" id="languageDropdown"></ul>
                </div>
            `);$(".navbar .dropdown").first().before(e)}if($("#languageDropdown").is(":empty")){let e=this.languageList.map(a=>`<li data-lang-code="${a.language_code}">${a.language_name}-${a.language_code}</li>`).join("");$("#languageDropdown").html(e)}$("#languageDropdown").on("click","li",e=>{let a=$(e.currentTarget).data("lang-code");this.set_language(a),$("#languageDropdown").removeClass("show")}),$(".dropbtn").click(function(e){e.stopPropagation(),$("#languageDropdown").toggleClass("show")})}set_language(e){this.showLoadingOverlay();let a=1;frappe.show_progress("Changing Language",0,a,"Initializing..."),frappe.call({method:"frappe.client.set_value",args:{doctype:"User",name:frappe.session.user,fieldname:"language",value:e},callback:t=>{if(this.hideLoadingOverlay(),t.exc)console.error("Error changing user language:",t.exc);else{frappe.show_progress("Changing Language",a,a,"Language changed successfully.");let o="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExejRwNnIydGNoemkyc2p0OWh0cTI3ODZjajlvN2hyZ3duNm5peW5oNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MXpEsbeaALaVOxXEtu/giphy.gif";frappe.msgprint({message:`<img src="${o}" alt="Success Animation" style="width: 200px; height: 200px;" /> Server-side action completed!`,indicator:"green"}),setTimeout(()=>{location.reload()},2e3)}}})}showLoadingOverlay(){$("#loadingOverlay").show()}hideLoadingOverlay(){$("#loadingOverlay").hide()}};$(document).click(function(s){$(s.target).closest(".dropdown").length||$("#languageDropdown").removeClass("show")});$(document).ready(function(){new frappe.ui.toolbar.Toolbar,$("#loadingOverlay").length===0&&$("body").append('<div id="loadingOverlay" style="display: none; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(0,0,0,0.5); z-index: 9999;"><div>Loading...</div></div>')});})();
//# sourceMappingURL=custom_button.bundle.33GZWJIZ.js.map
