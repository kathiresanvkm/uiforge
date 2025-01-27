frappe.templates["navbar"] = `<div class="sticky-top">
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
`;




frappe.ui.toolbar.Toolbar = class CustomSidebar extends frappe.ui.toolbar.Toolbar {
    constructor(wrapper) {
        // Call the parent class constructor with the wrapper
        super(wrapper);
        // User Information Logic
        const user = frappe.get_cookies();
        const userNameElement = document.querySelector('.user-name');
        const userStatusElement = document.querySelector('.user-status');
        const userData = frappe.get_cookies();

        frappe.db.get_value('User', userData.user_id, 'user_type', function(response) {
            let user_type = '';
            if (userData.user_id === 'Administrator') {
                user_type = __('Administrator');
            } else {
                user_type = response.user_type ? __(response.user_type) : __('User');
            }
            userNameElement.textContent = user.full_name || 'Guest';  // Assuming full_name is available in cookies
            // userStatusElement.textContent = user_type
        });

        // You can call additional methods or initialize extra functionality here if needed
        // e.g., super.setup_pages();
        this.add_custom_sidebar();
    }

    // Override the get_pages method
    add_custom_sidebar() {
        var targetElement = $('.fixed_sidebar');
        this.sidebar = $(this.custom_sidebar_html()).appendTo(targetElement);
       
        let arrow = document.querySelectorAll(".arrow");
		for (var i = 0; i < arrow.length; i++) {
 		    arrow[i].addEventListener("click", (e)=>{
 		        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
 		        arrowParent.classList.toggle("showMenu");
            });
        }
    }
    custom_sidebar_html() {

		var sb =`
		<div class="sidebar">
        <button class="toggle-btn">☰</button>
        <ul class="nav-links">`

		// console.log(frappe.boot.get_doctypes);
		$.each(frappe.boot.custom_workspace.pages,  function(i,  item) {
			sb +=`<li>
				<div class="icon-link">
                <div class="sidebar-title">
				<a href="/app/${
						item.public
						? frappe.router.slug(item.title)
						: "private/" + frappe.router.slug(item.title)
				}">
					<i class='${__(item.custom_custom_icon)}'style="color: #FFD43B;"></i>
					<span class="link_name">${__(item.title)}</span>
				  </a>
                </div>` 
				if(item.submenu){
				sb +=`<i class='fa fa-chevron-down arrow' style="min-width: 40px;"></i>` 
				}
        		sb +=`</div>` + item.submenu + `</li>`
		})
		sb +=`</ul></div>`

        return sb;
		
	}
};
