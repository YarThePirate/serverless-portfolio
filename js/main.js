import React from 'react';
import ReactDOM from 'react-dom';

import ExampleWork from './example-work';

const myWork = [
    {
        "title": "Cat Example",
        "image": {
            "desc": "Example screenshot of a project involving cats",
            "src": "images/example3.png",
            "comment": "'Bengal Cat' by roberto shabs is alicensed under CC BY 2.0\nhttps://www.flickr.com/photos/37287295@N00/2540855181"
        }
    },
    {
        "title": "Code Example",
        "image": {
            "desc": "Example screenshot of a project involving code",
            "src": "images/example1.png",
            "comment": ""
        }
    },
    {
        "title": "Chemistry Example",
        "image": {
            "desc": "Example screenshot of a project involving chemistry",
            "src": "images/example2.png",
            "comment": "'Chemistry' by Surian Soosay is licensed under CC BY 2.0\nhttps://www.flickr.com/photos/ssoosay/4097410999"
        }
    },
]

ReactDOM.render(<ExampleWork work={myWork} />, document.getElementById('example-work'));