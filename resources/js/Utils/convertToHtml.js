export function convertToHTML(data, currentContent = '') {
    
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
            case 'embed':
                if (block.data.service === 'youtube') {
                    const embedUrl = block.data.embed;
                    const width = block.data.width || 580; // default width if not provided
                    const height = block.data.height || 320; // default height if not provided
                    htmlString += `<iframe width="${width}" height="${height}" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
                }
                break;
            default:
                break;
        }
    });

    return htmlString;
}
