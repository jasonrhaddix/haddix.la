const sitenav = [
	{
		label: 'Projects',
		routeName: 'projects',
		needsAuth: false,
		children: []
	},
	{
		label: 'Roles',
		routeName: 'roles',
		needsAuth: true,
		children: []
	},
	{
		label: 'About',
		routeName: 'about',
		needsAuth: false,
		children: []
	},
	{
		label: 'Contact',
		routeName: 'contact',
		needsAuth: false,
		children: []
	},
	{
		label: 'Labs',
		routeName: 'labs',
		needsAuth: false,
		children: []
	}
]

export default sitenav
