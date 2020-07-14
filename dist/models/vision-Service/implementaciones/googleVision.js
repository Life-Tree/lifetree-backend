"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleVision = void 0;
const vision_1 = require("@google-cloud/vision");
class GoogleVision {
    async isTree(img) {
        let tree = false;
        const client = new vision_1.default.ImageAnnotatorClient({
            keyFilename: 'APIKEY_GOOGLE.json'
        });
        const [result] = await client.labelDetection({
            image: {
                content: img,
            }
        });
        const labels = result.labelAnnotations;
        labels.forEach(label => {
            if (label.description === 'Tree' && label.score > 0.79) {
                tree = true;
            }
        });
        return tree;
    }
}
exports.GoogleVision = GoogleVision;
//# sourceMappingURL=googleVision.js.map