import { prettyPrice } from '../lib/utils'
import { translate } from '../lib/translations'
import { genericTemplate } from './generic'
import { format } from 'date-fns'

const orderConfirmationTemplate = order => `
    ${genericTemplate(`               
        ${contentSection(`
            ${thankYou(order)}
        `)}
        
        ${contentSection(`
            ${summary(order)}
        `)}
        
        ${contentSection(`
            ${itemsHeader(order)}
            ${productsList(order)}
            ${separator()}
            ${costs(order)}
            ${order.comment && comment(order)}
        `)}
        
        <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
            <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                    <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#EFEFEF;width:600px">
                        ${footer(order)}
                    </table>
                </td>
            </tr>
        </table>
    `)}
`

const contentSection = children => `
    <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr style="border-collapse:collapse">
        <td align="center" style="padding:0;Margin:0">
            <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                ${children}
            </table>
        </td>
    </tr>
    </table>
`

const thankYou = order => `
    <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                            <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px">
                                    <h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#333333">
                                        ${translate('thank_you_for_order', order.locale)}
                                    </h1>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td align="center" style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:40px;padding-right:40px">
                                    <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                        ${translate('you_will_receive_mail', order.locale)}
                                    </p>
                                </td>
                            </tr>
                            <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-bottom:10px;padding-top:15px">
                                    <span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#393939;border-width:0px;display:inline-block;border-radius:5px;width:auto;border-top-width:0px;border-bottom-width:0px">
                                        <a href="${process.env.FRONTEND_URL}/${order.locale}/order/${
	order.id
}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:underline;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:16px;color:#FFFFFF;border-style:solid;border-color:#393939;border-width:10px 20px 10px 20px;display:inline-block;background:#393939;border-radius:5px;font-weight:normal;font-style:normal;line-height:19px;width:auto;text-align:center;border-top-width:10px;border-bottom-width:10px">
                                            ${translate('view_order_status', order.locale)}
                                        </a>
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
`

// prettier-ignore
const summary = order => `
    <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px">
            <!--[if mso]>
            <table style="width:560px" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:280px" valign="top">
                        <![endif]--> 
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr style="border-collapse:collapse">
                                <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:280px">
                                    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FEF9EF;border-color:#EFEFEF;border-width:1px 0px 1px 1px;border-style:solid" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fef9ef" role="presentation">
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
                                                <h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif">
                                                    ${translate('summary', order.locale, 'uppercase')}:
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                                <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left" role="presentation">
                                                    <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${translate('order_nr', order.locale)}:</td>
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${order.number}</td>
                                                    </tr>
                                                    <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${translate('order_date', order.locale)}:</td>
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}</td>
                                                    </tr>
                                                    <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${translate('order_total', order.locale)}:</td>
                                                        <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${prettyPrice(order.total / 100, order.currency)}</td>
                                                    </tr>
                                                </table>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333"><br></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                    <td style="width:0px"></td>
                    <td style="width:280px" valign="top">
                        <![endif]--> 
                        <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                            <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;width:280px">
                                    <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#FEF9EF;border-width:1px;border-style:solid;border-color:#EFEFEF" width="100%" cellspacing="0" cellpadding="0" bgcolor="#fef9ef" role="presentation">
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px">
                                                <h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif">
                                                    ${translate('shipping_address', order.locale, "uppercase")}:
                                                <br></h4>
                                            </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${order.customer.name}
                                                </p>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${order.customer.address}${order.customer.address2 ? `, ${order.customer.address2}` : ''}
                                                </p>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${order.customer.zip} ${order.customer.city}
                                                </p>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${order.customer.country}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
`

const itemsHeader = order => `
    <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
            <!--[if mso]>
            <table style="width:560px" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:270px" valign="top">
                        <![endif]--> 
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr style="border-collapse:collapse">
                                <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:270px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0;padding-left:20px">
                                                <h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif">
                                                    ${translate('items_ordered', order.locale, 'uppercase')}:
                                                </h4>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                    <td style="width:20px"></td>
                    <td style="width:270px" valign="top">
                        <![endif]--> 
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;width:270px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                                <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" role="presentation">
                                                    <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0;font-size:13px">
                                                            ${translate('items_name', order.locale, 'uppercase')}
                                                        </td>
                                                        <td style="padding:0;Margin:0;width:60px;font-size:13px;line-height:13px;text-align:center">
                                                            ${translate('items_sku', order.locale, 'uppercase')}
                                                        </td>
                                                        <td style="padding:0;Margin:0;width:100px;font-size:13px;line-height:13px;text-align:center">
                                                            ${translate('items_price', order.locale, 'uppercase')}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
`

const separator = () => `
    <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr style="border-collapse:collapse">
                    <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                        <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr style="border-collapse:collapse">
                                <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                                    <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td style="padding:0;Margin:0;border-bottom:1px solid #EFEFEF;background:#FFFFFFnone repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
`

// prettier-ignore
const productTile = item => `
    <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px">
            <!--[if mso]>
            <table style="width:560px" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:178px" valign="top">
                        <![endif]--> 
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr style="border-collapse:collapse">
                                <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:178px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td align="center" style="padding:0;Margin:0;font-size:0">
                                                <a href="${process.env.FRONTEND_URL}/da/product/${item.code.split('-')[0]}/${item.code}" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:14px;text-decoration:underline;color:#6FA8DC">
                                                    <img src="${item.image}" alt="${item.name}" class="adapt-img" title="${item.name}" width="125" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                    <td style="width:20px"></td>
                    <td style="width:362px" valign="top">
                        <![endif]--> 
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;width:362px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td align="left" style="padding:0;Margin:0">
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333"><br></p>
                                                <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" role="presentation">
                                                    <tr style="border-collapse:collapse">
                                                        <td style="padding:0;Margin:0">${item.name}</td>
                                                        <td style="padding:0;Margin:0;width:100px;text-align:center">${item.code}</td>
                                                        <td style="padding:0;Margin:0;width:100px;text-align:center">${prettyPrice(item.price, item.currency)}</td>
                                                    </tr>
                                                </table>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333"><br></p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
`

const productsList = order => `
    ${order.items.map(item => {
			return `
            ${separator()}
            ${productTile(item)}
        `
		})}
`

const costs = order => {
	// calculate subtotal
	let subtotal = 0
	order.items.map(item => (subtotal += item.price))

	const shippingCosts = JSON.parse(order.shippingCosts)

	// prettier-ignore
	return `
        <tr style="border-collapse:collapse">
            <td align="left" style="Margin:0;padding-top:5px;padding-left:20px;padding-bottom:30px;padding-right:40px">
                <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:540px">
                            <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                <tr style="border-collapse:collapse">
                                    <td align="right" style="padding:0;Margin:0">
                                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:500px" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="right" role="presentation">
                                            <tr style="border-collapse:collapse">
                                                <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">
                                                    ${translate('subtotal', order.locale)} (${order.items.length} ${order.items.length > 1 
                                                        ? translate('subtotal_items', order.locale)
                                                        : translate('subtotal_item', order.locale)
                                                    }):</td>
                                                <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">${prettyPrice(subtotal, order.currency)}</td>
                                            </tr>
                                            ${shippingCosts.map(cost => `
                                                <tr style="border-collapse:collapse">
                                                    <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">${translate(cost.code, order.locale)}:</td>
                                                    <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px">${prettyPrice(cost.price, order.currency)}</td>
                                                </tr>
                                            `)}
                                            <tr style="border-collapse:collapse">
                                                <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px"><strong>${translate("order_total", order.locale)}:</strong></td>
                                                <td style="padding:0;Margin:0;text-align:right;font-size:18px;line-height:27px;color:#D48344"><strong>${prettyPrice(order.total / 100, order.currency)}</strong></td>
                                            </tr>
                                        </table>
                                        <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333"><br></p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    `
}

// prettier-ignore
const comment = order => `
    <tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px">
            <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr style="border-collapse:collapse">
                    <td valign="top" style="padding:0;Margin:0;width:560px">
                        <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" width="100%" cellspacing="0" cellpadding="0" role="presentation">
                            <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;padding-top:10px;padding-bottom:15px">
                                    <p style="font-size:14px;line-height:21px;Margin:0;mso-line-height-rule:exactly;font-family:tahoma, verdana, segoe, sans-serif;font-style:normal;font-weight:normal;color:#333333">
                                        <strong>${translate('comments', order.locale)}: </strong>${order.comment}
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
`

// prettier-ignore
const footer = order => `
    <tr style="border-collapse:collapse">
        <td align="left" style="padding:20px;Margin:0">
            <!--[if mso]>
            <table style="width:560px" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="width:178px" valign="top">
                        <![endif]--> 
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                            <tr style="border-collapse:collapse">
                                <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:178px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td class="es-m-p0l es-m-txt-c" align="left" style="padding:0;Margin:0;font-size:0px">
                                                <a href="${process.env.FRONTEND_URL}" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:14px;text-decoration:underline;color:#333333">
                                                    <img src="https://ofongm.stripocdn.email/content/guids/CABINET_ff3dd6a20a723e3e16a7c04b2b835379/images/69351604074910224.png" alt="Kuraitis.dk logo" title="Kuraitis.dk logo" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="78">
                                                </a>
                                            </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px">
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    Sergio Kuraitis - Naturligt Design. CVR: ${process.env.COMPANY_CVR}
                                                </p>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${process.env.ADDRESS_ROAD}
                                                </p>
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${process.env.ADDRESS_CITY}, ${process.env.ADDRESS_COUNTRY}
                                                </p>
                                            </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-top:5px">
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    <a target="_blank" href="mailto:${process.env.CONTACT_MAIL}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:'lucida sans unicode', 'lucida grande', sans-serif;font-size:14px;text-decoration:underline;color:#333333">
                                                        ${process.env.CONTACT_MAIL}
                                                    </a>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                    <td style="width:20px"></td>
                    <td style="width:362px" valign="top">
                        <![endif]--> 
                        <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                            <tr style="border-collapse:collapse">
                                <td align="left" style="padding:0;Margin:0;width:362px">
                                    <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                        <tr style="border-collapse:collapse">
                                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0;padding-top:15px;padding-bottom:20px">
                                                <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    <span style="font-size:20px;line-height:30px">
                                                        ${translate('information', order.locale)}
                                                    </span>
                                                </p>
                                            </td>
                                        </tr>
                                        <tr style="border-collapse:collapse">
                                            <td class="es-m-txt-c" align="left" style="padding:0;Margin:0">
                                               <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:'lucida sans unicode', 'lucida grande', sans-serif;line-height:21px;color:#333333">
                                                    ${translate('you_are_receiving_this', order.locale)}<br>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--[if mso]>
                    </td>
                </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
`

export default orderConfirmationTemplate
