export function convertToHTML(data, currentContent = '') {
    console.log(currentContent);
    let htmlString = currentContent; // Start with the current content

    data.blocks.forEach(block => {
        switch (block.type) {
            case 'paragraph':
                htmlString += `<p>${block.data.text}</p>`;
                break;
            case 'header':
                htmlString += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case 'list':
                htmlString += '<ul>';
                block.data.items.forEach(item => {
                    htmlString += `<li>${item.content}</li>`;
                });
                htmlString += '</ul>';
                break;
            case 'image':
                const imageUrl = block.data.file.url;
                htmlString += `<img src="${imageUrl}" alt="${block.data.caption || ''}" />`;
                break;
            default:
                break;
        }
    });

    return htmlString;
}
