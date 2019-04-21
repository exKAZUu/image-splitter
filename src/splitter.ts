const widthInput = document.getElementById("width") as HTMLInputElement;
const heightInput = document.getElementById("height") as HTMLInputElement;
const fileInput = document.getElementById("file") as HTMLInputElement;
const downloadButton = document.getElementById('download') as HTMLLinkElement;
const canvases = document.getElementById("canvases") as HTMLDivElement;

const width = 3;
const height = 3;

fileInput.onchange = () => {
    while (canvases.firstChild) {
        canvases.removeChild(canvases.firstChild);
    }

    const img = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = () => {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const div = document.createElement('div');
                    canvases.appendChild(div);

                    const canvas = document.createElement('canvas');
                    div.appendChild(canvas);

                    const link = document.createElement('a');
                    link.text = 'Download';
                    link.download = `image-${y + 1}-${x + 1}.png`;
                    link.href = '#';
                    link.addEventListener('click', () => {
                        link.href = canvas.toDataURL('image/png');
                    });
                    div.appendChild(link);

                    const ctx = canvas.getContext('2d');
                    canvas.width = image.width / 3;
                    canvas.height = image.height / 3;
                    ctx.drawImage(image, canvas.width * x, canvas.height * y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
                    ctx.lineWidth = 1;
                    ctx.strokeStyle = "black";
                    ctx.rect(0, 0, canvas.width, canvas.height);
                    ctx.stroke();
                }
            }
        };
    }
};

