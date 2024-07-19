import ReactQuill, { Quill } from 'react-quill';
import QuillMarkdown from 'quilljs-markdown'
import { useMemo, useRef } from "react"
import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({ htmlStr, setHtmlStr }) => {
    const quillRef = useRef(null);
    
    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const file = input.files?.[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileType", "contentImage");

            try{
                await fetch(`/api/file/upload/file`, {
                    method: "POST",
                    body: formData,
                    headers:{
                        ACL: "public-read"
                    },
                }).then((res) => {
                    if(res.status !== 200){
                        alert("이미지 업로드 실패");
                        return null;
                    }
                    return res.json();
                }).then((data) => {
                    if(data === null) return;
                    const imageUrl = data.uploadFileUrl;
                    console.log(imageUrl);
                    const quillEditor = quillRef.current.getEditor();
                    quillEditor.clipboard.dangerouslyPasteHTML(
                        quillEditor.getLength(),
                        `<img src="${imageUrl}" alt="uploaded image" />`
                    );
                })
            } catch(error){
                console.error(error);
                alert("이미지 업로드 실패");
            }
        })
    };

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{'font': []}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                [{'align': []}, {'color': []}, {'background': []}],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
            imageResize: {
                parchment: ReactQuill.Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize'],
            }
        },
        markdownOptions: {},
    }), []);

    const formats = [
        'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'align', 'color', 'background'
    ]

    Quill.register('modules/markdownOptions', QuillMarkdown);

    return(
        <>
            <ReactQuill
                style={{height: '500px'}}
                ref={quillRef}
                theme="snow"
                modules={modules}
                formats={formats}
                value={htmlStr}
                onChange={(content, delta, source, editor) => setHtmlStr(editor.getHTML())} />
        </>
    )
}

export default QuillEditor;