import type { Notification as NotificationType } from "../types/service/notifications.js";
import type { Box } from "../types/widgets/box";
import type { EventBox } from "../types/widgets/eventbox";
import type { Gtk } from "../types/@girs/gtk-3.0/gtk-3.0";
const notifications = await Service.import("notifications");

export class Notification {
	public monitor: number;
	private list: Map<number, NotificationType>;
	private activeList: Box<
		EventBox<Box<Gtk.Widget, unknown>, { id: number }>,
		unknown
	>;
	constructor(monitor = 0) {
		this.monitor = monitor;
		this.list = new Map();
		notifications.popups.forEach((v) => this.list.set(v.id, v));
		this.activeList = Widget.Box({
			vertical: true,
			children: notifications.popups.map(this.notification),
		});
	}

	private notificationIcon({ app_entry, app_icon, image }: NotificationType) {
		if (image) {
			return Widget.Box({
				css:
					`background-image: url("${image}");` +
					"background-size: contain;" +
					"background-repeat: no-repeat;" +
					"background-position: center;",
			});
		}

		let icon = "dialog-information-symbolic";
		if (Utils.lookUpIcon(app_icon)) icon = app_icon;

		if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry;

		return Widget.Box({
			child: Widget.Icon(icon),
		});
	}

	private notification(n: NotificationType) {
		const icon = Widget.Box({
			vpack: "start",
			className: "notification_icon",
			child: this.notificationIcon(n),
		});
		const title = Widget.Label({
			className: "notification_title",
			xalign: 0,
			justification: "left",
			hexpand: true,
			maxWidthChars: 24,
			truncate: "end",
			wrap: true,
			label: n.summary,
			useMarkup: true,
		});
		const body = Widget.Label({
			className: "notification_body",
			hexpand: true,
			useMarkup: true,
			xalign: 0,
			justification: "left",
			label: n.body,
			wrap: true,
		});

		const actions = Widget.Box({
			className: "notification_actions",
			children: n.actions.map(({ id, label }) =>
				Widget.Button({
					className: "notification_action-button",
					onClicked: () => {
						n.invoke(id);
						n.dismiss();
						this.onDismissed(undefined, n.id);
					},
					hexpand: true,
					child: Widget.Label(label),
				}),
			),
		});

		return Widget.EventBox(
			{
				attribute: { id: n.id },
				onPrimaryClick: () => {
					n.dismiss();
					this.onDismissed(undefined, n.id);
				},
			},
			Widget.Box(
				{ className: `notification ${n.urgency}`, vertical: true },
				Widget.Box([icon, Widget.Box({ vertical: true }, title, body)]),
				actions,
			),
		);
	}

	private onNotified(_: unknown, id: number) {
		const n = notifications.getNotification(id);
		if (n) {
			this.activeList.children = [
				this.notification(n),
				...this.activeList.children,
			];
			this.list.set(n.id, n);
		}
	}

	private onDismissed(_: unknown, id: number) {
		this.activeList.children.find((n) => n.attribute.id === id)?.destroy();
		this.list.delete(id);
	}

	public render() {
		notifications.popupTimeout = 2_000;
		this.activeList
			.hook(notifications, this.onNotified.bind(this), "notified")
			.hook(notifications, this.onDismissed.bind(this), "dismissed");

		return Widget.Window({
			monitor: this.monitor,
			name: `notifications${this.monitor}`,
			className: "notifications_popups",
			anchor: ["top", "right"],
			child: Widget.Box({
				css: "min-width: 2px; min-height: 2px;",
				className: "notifications",
				vertical: true,
				child: this.activeList,
			}),
		});
	}
}
