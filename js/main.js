import React from 'react';
import ReactDOM from 'react-dom';

import ExampleWork from './example-work';

const myWork = [
    {
        "title": "Cat Example",
        "href": "",
        "desc": "lorem ipsum craft Seattle etc etc",
        "image": {
            "desc": "Example screenshot of a project involving cats",
            "src": "images/example3.png",
            "comment": "'Bengal Cat' by roberto shabs is alicensed under CC BY 2.0\nhttps://www.flickr.com/photos/37287295@N00/2540855181"
        }
    },
    {
        "title": "Python (Data Sci) - Jupyter Notebook",
        "href": "",
        "desc": "Here is some more example text, you schmuck.",
        "image": {
            "desc": "Example screenshot of a project involving code",
            "src": "images/example1.png",
            "comment": ""
        }
    },
    {
        "title": "Rust (Wasm) - Game of Life",
        "href": "",
        "desc": "My final example of an example of a description of an example.",
        "image": {
            "desc": "Example screenshot of a project involving chemistry",
            "src": "images/example2.png",
            "comment": "'Chemistry' by Surian Soosay is licensed under CC BY 2.0\nhttps://www.flickr.com/photos/ssoosay/4097410999"
        }
    },
]

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById('example-work'));