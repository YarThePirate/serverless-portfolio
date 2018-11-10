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
    
    it("...should be a <span> element", () => {
        expect(component.type()).toEqual('span');
    });
    
    it("...should contain as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(exWork.length);
    });
    
    it("...should allow the modal to open and close", () => {
        // '.instance()' function is provided by enzyme
        //      lets you call functions and get properties
        //      directly from the component
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toEqual(true);
        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toEqual(false);
        
    });
});

describe("ExampleWorkBubble component", () => {
    let mockOpenModalFn = jest.fn();
    let component = shallow(<ExampleWorkBubble example={ exWork[1] }
        openModal={ mockOpenModalFn }/>);
    let images = component.find("img");
    
    it("...should contain only one 'img'", () => {
        expect(images.length).toEqual(1);
    });
    
    it("...should have the image 'src' set correctly", () => {
        expect(images.prop('src')).toEqual(exWork[1].image.src);
    });
    
    it("...should call 'openModal' when clicked", () => {
        component.find(".section__exampleWrapper").simulate('click');
        expect(mockOpenModalFn).toHaveBeenCalled();
    });
});