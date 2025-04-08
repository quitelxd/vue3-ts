const modules = {}

const moduleFiles = import.meta.glob('./**/*.js', { eager: true })

Object.keys(moduleFiles).forEach((key) => {
    if (key === './index.js') return
    const path = key.replace(/(\.\/|\.js)/g, '')
    const [namespace, imported] = path.split('/')
    if (!modules[namespace]) {
        modules[namespace] = {
            namespaced: true
        }
    }
    modules[namespace][imported] = moduleFiles[key].default
})

export default modules 