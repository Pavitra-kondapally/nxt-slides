import {Component} from 'react'
import './index.css'

import SlideItem from '../SlideItem'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class HomePage extends Component {
  state = {
    activeSlide: initialSlidesList[0],
    slidesList: initialSlidesList,
    isEditHeadingButtonClicked: false,
    isEditDescriptionButtonClicked: false,
    headingInputValue: '',
    descriptionInputValue: '',
  }

  makingSlideActive = id => {
    const {slidesList} = this.state
    const activeTabObject = slidesList.find(each => each.id === id)
    this.setState({
      activeSlide: activeTabObject,
    })
  }

  addNewSlide = () => {
    const {activeSlide, slidesList} = this.state
    const newSlide = {
      id: `new-slide-${Date.now()}`,
      heading: 'Heading',
      description: 'Description',
    }
    const activeSlideIndex = slidesList.findIndex(
      each => each.id === activeSlide.id,
    )
    const newSlidesList = [
      ...slidesList.slice(0, activeSlideIndex + 1),
      newSlide,
      ...slidesList.slice(activeSlideIndex + 1),
    ]

    this.setState({
      activeSlide: newSlide,
      slidesList: newSlidesList,
    })
  }

  toggleEditHeading = () => {
    const {activeSlide} = this.state
    this.setState(prevState => ({
      isEditHeadingButtonClicked: !prevState.isEditHeadingButtonClicked,
      headingInputValue: {activeSlide}.heading,
    }))
  }

  onChangingHeadingInput = event => {
    this.setState({
      headingInputValue: event.target.value,
    })
  }

  updateHeading = () => {
    const {headingInputValue, activeSlide, slidesList} = this.state
    if (headingInputValue.trim() !== '') {
      const updatedSlidesList = slidesList.map(slide =>
        slide.id === activeSlide.id
          ? {...slide, heading: headingInputValue}
          : slide,
      )

      this.setState({
        activeSlide: {...activeSlide, heading: headingInputValue},
        isEditHeadingButtonClicked: false,
        slidesList: updatedSlidesList,
      })
    }
  }

  toggleEditDescription = () => {
    const {activeSlide} = this.state
    this.setState(prevState => ({
      isEditDescriptionButtonClicked: !prevState.isEditDescriptionButtonClicked,
      descriptionInputValue: {activeSlide}.description,
    }))
  }

  onChangingDescription = event => {
    this.setState({
      descriptionInputValue: event.target.value,
    })
  }

  updateDescription = () => {
    const {descriptionInputValue, activeSlide, slidesList} = this.state
    if (descriptionInputValue.trim() !== '') {
      const updatedSlidesList = slidesList.map(slide =>
        slide.id === activeSlide.id
          ? {...slide, description: descriptionInputValue}
          : slide,
      )

      this.setState({
        activeSlide: {...activeSlide, description: descriptionInputValue},
        isEditDescriptionButtonClicked: false,
        slidesList: updatedSlidesList,
      })
    }
  }

  render() {
    const {
      activeSlide,
      slidesList,
      isEditHeadingButtonClicked,
      isEditDescriptionButtonClicked,
      headingInputValue,
      descriptionInputValue,
    } = this.state
    console.log('active slide: ', activeSlide)
    return (
      <div className="home-page-container">
        <button
          type="button"
          className="add-new-button"
          onClick={this.addNewSlide}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            className="plus-image"
            alt="new plus icon"
          />
          <p className="button-text">New</p>
        </button>
        <div className="slides-container">
          <ol className="slides-list" type="1">
            {slidesList.map((eachSlide, index) => (
              <SlideItem
                key={eachSlide.id}
                slideDetails={eachSlide}
                isActive={eachSlide.id === activeSlide.id}
                makingSlideActive={this.makingSlideActive}
                indexNo={index}
              />
            ))}
          </ol>
          <div className="current-slide-container">
            {isEditHeadingButtonClicked ? (
              <input
                className="heading-input"
                value={headingInputValue}
                onChange={this.onChangingHeadingInput}
                onBlur={this.updateHeading}
              />
            ) : (
              <h1
                className="current-slide-heading"
                onClick={this.toggleEditHeading}
              >
                {activeSlide.heading}
              </h1>
            )}
            {isEditDescriptionButtonClicked ? (
              <input
                className="description-input"
                value={descriptionInputValue}
                onChange={this.onChangingDescription}
                onBlur={this.updateDescription}
              />
            ) : (
              <p
                className="current-slide-description"
                onClick={this.toggleEditDescription}
              >
                {activeSlide.description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
