from __future__ import unicode_literals
import frappe
from frappe.utils import cint
from json import dumps, loads
from frappe.core.doctype.custom_role.custom_role import get_custom_allowed_roles
from functools import wraps
from frappe import DoesNotExistError, ValidationError, _, _dict

from frappe.desk.desktop import Workspace


def custom_get_workspace_sidebar_items(bootinfo):
	"""Get list of sidebar items for desk"""
	has_access = "Workspace Manager" in frappe.get_roles()

	# don't get domain restricted pages
	blocked_modules = frappe.get_cached_doc("User", frappe.session.user).get_blocked_modules()
	blocked_modules.append("Dummy Module")

	# adding None to allowed_domains to include pages without domain restriction
	allowed_domains = [None, *frappe.get_active_domains()]

	filters = {
		"restrict_to_domain": ["in", allowed_domains],
		"module": ["not in", blocked_modules],
	}

	if has_access:
		filters = [] 

	# pages sorted based on sequence id
	order_by = "sequence_id asc"
	fields = [
		"name",
		"title",
		"for_user",
		"parent_page",
		"content",
		"public",
		"module",
		"icon",
		"indicator_color",
		"is_hidden",
		#"custom_colour",
		"custom_custom_icon"
	]
	all_pages = frappe.get_all(
		"Workspace", fields=fields, filters=filters, order_by=order_by, ignore_permissions=True
	)
	pages = []
	private_pages = []

	# Filter Page based on Permission
	for page in all_pages:
		try:
			workspace = Workspace(page, True)
			if has_access or workspace.is_permitted():
				if page.public and (has_access or not page.is_hidden) and page.title != "Welcome Workspace":
					pages.append(page)
				elif page.for_user == frappe.session.user:
					private_pages.append(page)
				page["label"] = _(page.get("name"))
				ws_sh = frappe.get_all("Workspace Shortcut", fields=['name','link_to','type','label'], filters={'parent':page.name,'type':['!=','URL']}, order_by='idx desc', ignore_permissions=True )
				page["submenu"] = '' if not ws_sh else f'<ul class="sub-menu">\n ' + '\n'.join(map(lambda item: f'    <li><a href="/app/{item["link_to"].lower().replace(" ", "-")}">{item["label"]}</a></li>', ws_sh)) + '</ul>'
		except frappe.PermissionError:
			pass
	if private_pages:
		pages.extend(private_pages)

	if len(pages) == 0:
		pages = [frappe.get_doc("Workspace", "Welcome Workspace").as_dict()]
		pages[0]["label"] = _("Welcome Workspace")

	bootinfo.custom_workspace = {
		"pages": pages,
		"has_access": has_access,
		"has_create_access": frappe.has_permission(doctype="Workspace", ptype="create"),
	}

def get_doctypes(bootinfo):
    # Fetch all Doctypes and assign them to bootinfo
    bootinfo.get_doctypes = frappe.db.get_list('DocType', pluck='name')