import { Bar } from "./bar.js";
import { Notification } from "./notifications.js";

App.config({
	style: App.configDir + "/src/style.css",
	windows: [new Notification(0).render(), Bar(0)],
	// windows: [NotificationPopups(0), Bar(0)],
});
