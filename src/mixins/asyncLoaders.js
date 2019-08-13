const loadView = (fileObj) => {
	if (fileObj.hasOwnProperty('path') && fileObj.path !== null && fileObj.path !== '' && fileObj.hasOwnProperty('file')) {
		return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${fileObj.path}/${fileObj.file}.vue`)
	} else if (fileObj.hasOwnProperty('file')) {
		return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${fileObj.file}.vue`)
	}
	// throw 'loadView requires an object with a file string, and optionally a path string'
}

const loadComponent = (fileObj) => {
	if (fileObj.hasOwnProperty('path') && fileObj.path !== null && fileObj.path !== '' && fileObj.hasOwnProperty('file')) {
		return () => import(/* webpackChunkName: "component-[request]" */ `@/components/${fileObj.path}/${fileObj.file}.vue`)
	} else if (fileObj.hasOwnProperty('file')) {
		return () => import(/* webpackChunkName: "component-[request]" */ `@/components/${fileObj.file}.vue`)
	}
	// throw 'loadComponent requires an object with a file string, and optionally a path string'
}

export {
	loadView,
	loadComponent
}
