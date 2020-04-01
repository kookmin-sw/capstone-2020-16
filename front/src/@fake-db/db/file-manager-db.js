import mock from '../mock';

const fileManagerDB = {
	files: [
		{
			id: '1',
			name: 'Concave',
			type: 'document',
			VS: 'me',
			size: '',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true
		},
		{
			id: '2',
			name: 'Concave',
			type: 'document',
			VS: 'public',
			size: '',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true
		},
		{
			id: '3',
			name: 'Biological warfare',
			type: 'document',
			VS: 'me',
			size: '',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true
		},
		{
			id: '4',
			name: 'Biological warfare',
			type: 'document',
			VS: 'Emily Bennett',
			size: '1.2 Mb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '5',
			name: 'Shopping list',
			type: 'document',
			VS: 'Emily Bennett',
			size: '980 Kb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '6',
			name: 'Invoices',
			type: 'document',
			VS: 'Emily Bennett',
			size: '750 Kb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '7',
			name: 'Crash logs',
			type: 'document',
			VS: 'Emily Bennett',
			size: '980 Mb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '8',
			name: 'System logs',
			type: 'document',
			VS: 'Emily Bennett',
			size: '52 Kb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '9',
			name: 'Prices',
			type: 'document',
			VS: 'Emily Bennett',
			size: '27 Mb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '10',
			name: 'Anabelle Manual',
			type: 'document',
			VS: 'Emily Bennett',
			size: '1.1 Kb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		},
		{
			id: '11',
			name: 'Steam summer sale budget',
			type: 'document',
			VS: 'Emily Bennett',
			size: '505 Kb',
			Date: 'July 8, 2017',
			opened: 'July 8, 2017',
			created: 'July 8, 2017',
			extention: '',
			location: 'Replay',
			offline: true,
			preview: 'assets/images/etc/sample-file-preview.jpg'
		}
	]
};

mock.onGet('/api/file-manager-app/files').reply(config => {
	return [200, fileManagerDB.files];
});
