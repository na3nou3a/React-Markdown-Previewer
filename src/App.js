import React, { Component } from 'react';
import { FaArrowsAlt, FaCompressAlt } from 'react-icons/fa';
import { marked } from 'marked';
import { Prism } from 'prism-react-renderer';

const placeholder = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.
There's also [links](https://www.freecodecamp.org), and
> Block Quotes!
And if you want to get really crazy, even tables:
Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
// ALLOWS LINE BREAKS WITH RETURN BUTTON
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  },
});
// INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizeEditor: false,
      resizePreviewer: false,
      markDown: placeholder,
    };

    this.resize = this.resize.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  resize(name) {
    this.setState({
      [name]: !this.state[name],
    });
  }

  handleChange(value) {
    this.setState({
      markDown: value,
    });
  }

  render() {
    const { resizeEditor, resizePreviewer, markDown } = this.state;
    const editorClasses = resizeEditor ? `editor zoomed` : `editor`;

    const previewClasses = resizePreviewer
      ? `preview section-body zoomed`
      : `preview section-body`;

    return (
      <main className='container'>
        {!resizePreviewer && (
          <section className='section editor-section'>
            <header className='section-header'>
              <h2>Editor</h2>
              <button
                type='button'
                className='btn resize-btn'
                onClick={() => this.resize('resizeEditor')}
              >
                {resizeEditor ? <FaCompressAlt /> : <FaArrowsAlt />}
              </button>
            </header>
            <div className='section-body'>
              <textarea
                id='editor'
                className={editorClasses}
                value={markDown}
                onChange={(e) => this.handleChange(e.target.value)}
              >
                {markDown}
              </textarea>
            </div>
          </section>
        )}
        {!resizeEditor && (
          <section className='section preview-section'>
            <header className='section-header'>
              <h2>Previewer</h2>
              <button
                type='button'
                className='btn resize-btn'
                onClick={() => this.resize('resizePreviewer')}
              >
                {resizePreviewer ? <FaCompressAlt /> : <FaArrowsAlt />}
              </button>
            </header>

            <Preview markdown={this.state.markDown} classes={previewClasses} />
          </section>
        )}
      </main>
    );
  }
}

const Preview = (props) => {
  return (
    <div
      id='preview'
      className={props.classes}
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer }),
      }}
    />
  );
};

export default App;
