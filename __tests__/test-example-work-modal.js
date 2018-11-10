import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWorkModal from '../js/example-work-modal';

Enzyme.configure({ adapter: new Adapter() });

const myExample = {
    "title": "Cat Example",
    "href": "https://www.example.com",
    "desc": "This is as super giga example to the MAX",
    "image": {
        "desc": "Example screenshot of a project involving cats",
        "src": "images/example3.png",
        "comment": "'Bengal Cat' by roberto shabs is alicensed under CC BY 2.0\nhttps://www.flickr.com/photos/37287295@N00/2540855181"
    }
}

describe("ExampleWorkModal component", () => {
    let mockCloseModalFn = jest.fn();
    
    let component = shallow(<ExampleWorkModal 
            example={ myExample } 
            open={ false } 
            closeModal={ mockCloseModalFn }/>);
    let openComponent = shallow(<ExampleWorkModal 
            example={ myExample } 
            open={ true }
            closeModal={ mockCloseModalFn }/>);
    let anchors = component.find("a");
    
    it("...should render only one anchor element", () => {
        expect(anchors.length).toEqual(1);
    });
    
    it("...should link to our project", () => {
        expect(anchors.prop('href')).toEqual(myExample.href);
    });
    
    it("...should have the modal class set correctly", () => {
        expect(component.find(".background--skyBlue").hasClass("modal--closed")).toEqual( true );
        expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toEqual( true );
    });
    
    it("...should call 'closeModal' when the 'X' btn is clicked", () => {
        component.find(".modal__closeButton").simulate('click');
        expect(mockCloseModalFn).toHaveBeenCalled();
    });
});