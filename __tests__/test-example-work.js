import React from 'react';
import { shallow } from 'enzyme';

import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

const exWork = [
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
    }
];

describe("ExampleWork component", () => {
    
    let component = shallow(<ExampleWork work={exWork} />);
    
    it("...should be a <section> element", () => {
        expect(component.type()).toEqual('section');
    });
    
    it("...should contain as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(exWork.length);
    });
});

describe("ExampleWorkBubble component", () => {
    let component = shallow(<ExampleWorkBubble example={ exWork[1] } />);
    let images = component.find("img");
    
    it("...should contain only one 'img'", () => {
        expect(images.length).toEqual(1);
    });
    
    it("...should have the image 'src' set correctly", () => {
        expect(images.prop('src')).toEqual(exWork[1].image.src);
    });
});