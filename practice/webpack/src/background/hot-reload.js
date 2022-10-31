const filesInDirectory = dir => new Promise(resolve =>
    dir.createReader().readEntries(entries =>
        Promise.all(entries.filter(e => e.name[0] !== '.').map(e =>
            e.isDirectory ?
            filesInDirectory(e) :
            new Promise(resolve => e.file(resolve))
        ))
        .then(files => [].concat(...files))
        .then(resolve)
    )
);

const timestampForFilesInDirectory = dir =>
    filesInDirectory(dir).then(files =>
        files.map(f => f.name + f.lastModifiedDate).join());

const reload = () => {
    window.chrome.tabs.query({
        active: true,
        currentWindow: true
    }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5
        if (tabs[0]) {
            window.chrome.tabs.reload(tabs[0].id)
        }
        window.chrome.runtime.reload()
    })
};

const watchChanges = (dir, lastTimestamp) => {
    timestampForFilesInDirectory(dir).then(timestamp => {
        if (!lastTimestamp || (lastTimestamp === timestamp)) {
            setTimeout(() => watchChanges(dir, timestamp), 1000) // retry after 1s
        } else {
            reload()
        }
    })
};

console.log(window.chrome.management)
window.chrome.management.getSelf(self => {
    console.log(self)
    if (self.installType === 'development') {
        console.log(123)
        window.chrome.runtime.getPackageDirectoryEntry(dir => watchChanges(dir))
    }
});
