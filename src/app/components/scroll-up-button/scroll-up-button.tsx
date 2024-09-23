'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretUp } from '@fortawesome/free-solid-svg-icons';
import {useState,useEffect,useRef} from 'react';
import {useScrollUpDiv} from '@/app/lib/scroll-up/scroll-up-provider';
import { Transition } from 'react-transition-group';

export default function ScrollUpButton() {
    const [displayButton, setDisplayButton] = useState(false);
    const scrollUpDiv = useScrollUpDiv();
    const buttonRef = useRef(null);

    const duration = 300;

    const defaultStyle = {
        transition: `opacity ${duration}ms linear`,
        opacity: 0        
      }
      
      type TransitionStylesType = {
        [key: string]: {[key2: string]: number}
      }

      const transitionStyles: TransitionStylesType = {
        entering: { opacity: 0 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 1 },
        exited:  { opacity: 0 },
      };
    
    const handleDisplayButton = () => {
        const position = window.scrollY;

        if(position >= 50) {
            setDisplayButton(true);
        }
        else {
            setDisplayButton(false);
        }
    }

    const handleScrollUp = () => {
        if(scrollUpDiv?.current) {
            scrollUpDiv.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleDisplayButton);

        return () => {
            document.removeEventListener('scroll',handleDisplayButton);
        }
    },[]);

    return (
        <Transition nodeRef={buttonRef} in={displayButton} timeout={duration}>
            {state => (
            <div className={`fixed right-4 bottom-4 hover:scale-110`}
                onClick={handleScrollUp} ref={buttonRef}
                style={{...defaultStyle, ...transitionStyles[state.toString()],
                    cursor: displayButton ? 'pointer' : 'default'
                }}>
                <FontAwesomeIcon icon={faSquareCaretUp} size="3x" />
            </div>
            )}
        </Transition>
    )
}