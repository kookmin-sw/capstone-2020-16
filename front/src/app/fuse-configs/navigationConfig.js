const navigationConfig = [
	{
		id: 'applications',
		title: 'Applications',
		translate: 'MENU',
		type: 'group',
		icon: 'apps',
		children: [
			
			{
				id: 'HOME',
				title: 'HOME',
				translate: 'HOME',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/home'
				
			},
			{
				id: 'game',
				title: 'GAME',
				translate: 'GAME',
				type: 'collapse',
				icon: 'games',
				children: [
					{
						id: 'game-problem',
						title: 'Problem',
						type: 'item',
						url: '/apps/game/problem',
						icon:'school',
					},
					{
						id: 'game-battle',
						title: 'Battle',
						type: 'item',
						url: '/apps/game/battle',
						icon:'person',
					},
					{
						id: 'game-replay',
						title: 'Replay',
						translate: 'Replay',
						type: 'item',
						url: '/apps/game/Replay',
						icon:'play_circle_filled',
					},
					{
						id: 'game-VSMyCodes',
						title: 'VSMyCodes',
						translate: 'vs My Codes',
						type: 'item',
						url: '/SelfBattle',
						icon:'touch_app',
					}

				]
			},
			{
				id: 'Code List',
				title: 'Code-List',
				translate: 'Code-List',
				type: 'item',
				url: '/apps/codelist/',
				icon: 'format_list_bulleted',
				
			},
			{
				id: 'Ranking',
				title: 'Ranking',
				translate: 'Ranking',
				type: 'item',
				icon: 'thumb_up',
				url: '/ranking'
				
			},
		]
	},
];

export default navigationConfig;
