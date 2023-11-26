import './index.css'

const SlideItem = props => {
  const {slideDetails, isActive, makingSlideActive, indexNo} = props
  const {id, heading, description} = slideDetails
  const onClickingSlideTab = () => {
    makingSlideActive(id)
  }
  const slideClassName = isActive ? 'active-tab' : 'inactive-tab'

  return (
    <li
      className={`slide-item-container ${slideClassName}`}
      onClick={onClickingSlideTab}
      testid={`slideTab${indexNo + 1}`}
    >
      <p className="number-text">{indexNo + 1}</p>
      <h1 className="slide-heading">{heading}</h1>
      <p className="slide-description">{description}</p>
    </li>
  )
}

export default SlideItem
