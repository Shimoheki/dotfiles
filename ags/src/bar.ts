const hyprland = await Service.import("hyprland");

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
					label: `${id}`,
					className: activeId.as((i) => `${i === id ? "focused" : ""}`),
					onClicked: () => dispatch(id),
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

const Start = () =>
	Widget.Box({
		children: [Workspaces(), Widget.Box({ hexpand: true })],
	});

const Center = () =>
	Widget.Box({
		child: focusedTitle(),
	});

const End = () =>
	Widget.Box({
		children: [Widget.Box({ hexpand: true }), Clock()],
	});

export const Bar = (monitor: number) =>
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
