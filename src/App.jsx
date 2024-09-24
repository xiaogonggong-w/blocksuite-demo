import './App.css'
import { useEffect } from "react"
import { useRef } from "react"
import { Schema } from '@blocksuite/store';
import { DocCollection } from '@blocksuite/store';
import { AffineSchemas } from '@blocksuite/blocks';
import { PageEditor, AffineEditorContainer, EdgelessEditor, DocTitle } from "@blocksuite/presets";
import { effects } from '@blocksuite/presets/effects'
effects()
const title = new DocTitle()
const editor = new PageEditor()
function App() {
  const editorRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    const schema = new Schema().register(AffineSchemas);
    const collection = new DocCollection({ schema });
    collection.meta.initialize();
    const doc = collection.createDoc({ id: 'page1' });

    doc.load(() => {
      const pageBlockId = doc.addBlock('affine:page', {});
      doc.addBlock('affine:surface', {}, pageBlockId);
      const noteId = doc.addBlock('affine:note', {}, pageBlockId);
      doc.addBlock('affine:paragraph', {}, noteId);
    });

    

    title.doc = doc
    titleRef.current.appendChild(title)

   
    editor.doc = doc
    editorRef.current.appendChild(editor)
  }, [])
  return (
    <>
      <div className="title" ref={titleRef}></div>

      <div ref={editorRef}>

      </div>
    </>

  )
}

export default App
