import React, { useState, useEffect, useRef } from 'react'
import './Projects.scss';
import gsap from 'gsap';
import { projectsData } from './utils';
import { FaReact } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { SiRedux } from 'react-icons/si';
import { SiHtml5 } from 'react-icons/si';
import { SiCsswizardry } from 'react-icons/si';
import { FaCcStripe } from 'react-icons/fa';
import { SiMaterialUi } from 'react-icons/si';
import { FaBootstrap } from 'react-icons/fa';
import { FaSass } from 'react-icons/fa';
import { FaNode } from 'react-icons/fa';
import { SiFramer } from 'react-icons/si';
import { SiFirebase } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';
import { CgPushRight } from 'react-icons/cg';
import { CgArrowLongRight } from 'react-icons/cg';

import { CgArrowTopRightR } from 'react-icons/cg';
import { AiOutlineRight } from 'react-icons/ai';
import { AiOutlineLeft } from 'react-icons/ai';


// TODO_1:
// ! Problem : Having one useRef() and passing it in loop, will point to the latest DOM element
// * Solution : Create and array of React.createRef() and use index in map 
//* to fill them with relevant DOM element by using callback refs.
// ! Problem : Clicking between projects numbers triggers animation glitch


function animateProjects(firstLoad, ...nodeRefs) {
    gsap.from(nodeRefs, {
        duration: firstLoad ? 1 : 0.5,
        y: firstLoad ? 20 : 6,
        delay: firstLoad ? .3 : .1,
        opacity: 0,
        ease: "power3.inOut",
        stagger: { amount: firstLoad ? 0.2 : 0.1 }
    });
};




function Projects() {
    const [selectedProject, setSelectedProject] = useState(projectsData['1']);
    const [width, setWidth] = useState(window.innerWidth);
    const projectContentRef = useRef();
    const titleRef = useRef();
    const imgRef = useRef();
    const infoBlockRef = useRef();
    const tasksRef = useRef();
    const stackList = useRef();

    useEffect(() => {
        const refsArr = [titleRef.current, imgRef.current, infoBlockRef.current, tasksRef.current, stackList.current];
        animateProjects(true, ...refsArr)
    }, []);

    useEffect(() => {
        const refsArr = [titleRef.current, imgRef.current, infoBlockRef.current, tasksRef.current, stackList.current];
        animateProjects(false, ...refsArr)

    }, [selectedProject]);


    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return function () { window.removeEventListener('resize', handleResize) };
    });



    const handlePrevProject = () => {
        if (selectedProject.number == 1) {
            const maxNumbOfProjects = Object.keys(projectsData).length;
            setSelectedProject(projectsData[`${maxNumbOfProjects}`]);
        } else {
            setSelectedProject(projectsData[`${Number(selectedProject.number) - 1}`]);
        }
    };

    const handleNextProject = () => {
        const maxNumbOfProjects = Object.keys(projectsData).length;
        if (selectedProject.number == maxNumbOfProjects) {
            setSelectedProject(projectsData[1]);
        } else {
            setSelectedProject(projectsData[`${Number(selectedProject.number) + 1}`]);
        }
    };


    return (
        <React.Fragment>
            <div className="container">
                <div className="wrapper">
                    <h3>Projects</h3>
                    <div className="projects-wrapper">

                        <div ref={projectContentRef} className="project-content">

                            <button type="button" className="button prev-button" onClick={handlePrevProject}>
                                {width < 700 ? <AiOutlineLeft /> : 'Prev'}
                            </button>

                            <button type="button" className="button next-button" onClick={handleNextProject}>
                                {width < 700 ? <AiOutlineRight /> : 'Next'}
                            </button >

                            <div className="project-info">
                                <a href={selectedProject.linkUrl} className="project-img-link">
                                    <div
                                        ref={imgRef}
                                        style={{ backgroundImage: `url(${selectedProject.img.default})` }}
                                        className="project-img">
                                        <div className="project-img-link-layer"></div>
                                        <div className="project-img-link-title">See the project</div>
                                    </div>
                                </a>
                                <div ref={infoBlockRef} className="project-info-block">
                                    <div ref={titleRef} className="project-title">{selectedProject.name}</div>
                                    <p>{selectedProject.description}</p>
                                    <ul className="achievements-list" ref={tasksRef}>
                                        {selectedProject.achives.map((el, index) => <li key={index}> {el}</li>)}
                                    </ul>
                                    <ul ref={stackList} className="tech-stack-list">
                                        {selectedProject.stack.map((el, index) => <li style={{ color: el.color }} key={index}>{el.icon}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </React.Fragment >
    )
}

export default Projects
