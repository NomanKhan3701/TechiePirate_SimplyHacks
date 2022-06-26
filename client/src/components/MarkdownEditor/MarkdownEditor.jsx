import SimpleMdeReact from "react-simplemde-editor";
import './MarkdownEditor.scss'
import React, { useState, useCallback } from 'react'

const MarkdownEditor = ({ setMarkdownVal }) => {
	const [value, setValue] = useState("");

	const onChange = useCallback((value) => {
		setMarkdownVal(value);
		setValue(value);
	}, []);
	return (
		<div className="markdown-editor">
			<SimpleMdeReact placeholder="Write about your event here" value={value} onChange={onChange} />
		</div>
	)
}

export default MarkdownEditor