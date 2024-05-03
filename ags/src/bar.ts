const hyprland = await Service.import("hyprland");
const systemtray = await Service.import("systemtray");
const audio = await Service.import("audio");
const network = await Service.import("network");

const focusedTitle = () =>
	Widget.Label({
		label: hyprland.active.client.bind("title"),
		visible: hyprland.active.client.bind("address").as((addr) => !!addr),
	});

function Workspaces() {
	const dispatch = (ws: string | number) =>
		hyprland.messageAsync(`dispatch workspace ${ws}`);
	const activeId = hyprland.active.workspace.bind("id");
	const workspaces = hyprland.bind("workspaces").as((ws) =>
		ws
			.sort((a, b) => a.id - b.id)
			.map(({ id }) =>
				Widget.Button({
					attribute: id,
					label: activeId.as((i) => `${id}${i === id ? "-active" : ""}`),
					className: activeId.as(
						(i) => `workspace ${i === id ? "focused" : ""}`,
					),
					onClicked: () => dispatch(id).catch((err) => console.error(err)),
				}),
			),
	);

	return Widget.EventBox({
		onScrollUp: () => dispatch("e+1"),
		onScrollDown: () => dispatch("e-1"),
		child: Widget.Box({
			children: workspaces,
			setup: (self) =>
				self.hook(hyprland, () =>
					self.children.forEach(
						(btn) =>
							(btn.visible = hyprland.workspaces.some(
								(ws) => ws.id === btn.attribute,
							)),
					),
				),
		}),
	});
}

function Clock() {
	let i = 0;
	const formats = ["+%H:%M %b. %e", "+%H:%M:%S %b. %e", "+%H:%M:%S %B %e"];
	return Widget.Button({
		onClicked: (event) => {
			i++;
			if (i > formats.length - 1) i = 0;
			event.label = Utils.exec(`date "${formats[i]}"`);
		},
		label: Utils.exec(`date "${formats[i]}"`),
	}).poll(1000, (self) => (self.label = Utils.exec(`date "${formats[i]}"`)));
}

function SysTray() {
	const items = systemtray.bind("items").as((items) =>
		items.map((item) =>
			Widget.Button({
				child: Widget.Icon({ icon: item.bind("icon") }),
				onPrimaryClick: (_, event) => item.activate(event),
				onSecondaryClick: (_, event) => item.openMenu(event),
				tooltipMarkup: item.bind("tooltip_markup"),
			}),
		),
	);

	return Widget.Box({
		children: items,
	});
}

function Volume() {
	const icons = {
		101: "overamplified",
		67: "high",
		34: "medium",
		1: "low",
		0: "muted",
	};

	function getIcon() {
		let icon = audio.speaker.is_muted
			? 0
			: [101, 67, 34, 1, 0].find(
					(threshold) => threshold <= audio.speaker.volume * 100,
				);
		if (!icon) icon = 0;
		return `audio-volume-${icons[icon]}-symbolic`;
	}

	const icon = Widget.Icon({
		icon: Utils.watch(getIcon(), audio.speaker, getIcon),
	});

	const slider = Widget.Slider({
		hexpand: true,
		drawValue: false,
		value: audio.speaker.bind("volume").as((n) => n || 0),
		setup: (self) =>
			self.hook(audio.speaker, () => {
				self.value = audio.speaker.volume || 0;
			}),
	});

	return Widget.Box({
		className: "volume",
		css: "min-width: 180px",
		children: [icon, slider],
	});
}

const Start = () =>
	Widget.Box({
		hpack: "start",
		spacing: 8,
		// children: [Workspaces(), Widget.Box({ hexpand: true })],
		children: [Workspaces()],
	});

const Center = () =>
	Widget.Box({
		spacing: 8,
		child: focusedTitle(),
	});

const End = () =>
	Widget.Box({
		hpack: "end",
		spacing: 8,
		// children: [Widget.Box({ hexpand: true }), SysTray(), Clock()],
		children: [Volume(), SysTray(), Clock()],
	});

export const Bar = (monitor = 0) =>
	Widget.Window({
		name: `bar-${monitor}`,
		anchor: ["top", "left", "right"],
		exclusivity: "exclusive",
		child: Widget.CenterBox({
			vertical: false,
			startWidget: Start(),
			centerWidget: Center(),
			endWidget: End(),
		}),
	});
