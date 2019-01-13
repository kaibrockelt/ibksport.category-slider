import React, { Component, Fragment } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { productShape } from '../propTypes'

import { optionPricePerItem, parentPricePerUnit } from '../utils/attachmentHelper'

class ProductSummaryAttachmentsList extends Component {
  static propTypes = {
    product: productShape,
    intl: intlShape,
  }
  componentDidMount() {
    console.log('teste == ProductSummaryAttachmentsList: ', JSON.stringify(this.props.product))
  }

  // Achar maneira melhor de saber qual attachment nao mostrar
  canShow = (option) => option.optionType !== 'Basic Toppings'

  parentPrice = () => {
    const { product } = this.props
    const wholePrice = product.sku.seller.commertialOffer.Price
    const parentPrice = product.addedOptions.reduce((total, { sku }) => 
      total - sku.seller.commertialOffer.Price,
      wholePrice
      )
    return parentPrice / product.quantity
  }

  renderItem = (productText, product, price) => {
    return (
      <div className="flex items-center justify-between" key={product.productName}>
        <span className="f5 c-muted-2">{productText}</span>
        <ProductPrice
          sellingPrice={price}
          sellingPriceContainerClass="pt1 pb3 c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib f5 c-muted-2"
          showListPrice={false}
          showLabels={false}
          showInstallments={false}
        />
      </div>
    )
  }

  render() {
    const { product, intl } = this.props

    if (!product.addedOptions || product.addedOptions.length === 0) {
      return null
    }

    return (
      <Fragment>
        {this.renderItem(intl.formatMessage({ id: 'editor.productSummary.unit' }), product, parentPricePerUnit(product))}
        {product.addedOptions.filter(this.canShow).map(option => {
          const productText = 
            option.isSingleChoice ? option.productName : `+ ${option.quantity / product.quantity}× ${option.productName}`
          const price = optionPricePerItem(option, product)
          return this.renderItem(productText, option, price)
        })}
      </Fragment> 
    )
  }
}

export default injectIntl(ProductSummaryAttachmentsList)
