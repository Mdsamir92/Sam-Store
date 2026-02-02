interface OrderDeliveredProps {
  username: string;
  orderId: string;
  total: number;

  product: {
    title: string;
    image: string;
    qty: number;
    size?: string;
    color?: string;
  }[];
}

export const orderDeliveredTemplate = ({
  username,
  orderId,
  total,
  product,
}: OrderDeliveredProps) => `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" style="background:#ffffff; margin:30px 0; border-radius:8px; overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td style="background:#2874f0; padding:16px; color:#fff; font-size:20px; font-weight:bold;">
                📦 Item Delivered
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:24px;">
                <p style="font-size:16px;">Hi <strong>${username}</strong>,</p>

                <p style="font-size:14px; color:#444;">
                  We’re happy to inform you that your order has been
                  <strong style="color:#2e7d32;">delivered successfully</strong>.
                </p>

                <!-- ORDER INFO -->
                <div style="background:#f1f3f6; padding:14px; border-radius:6px; margin:16px 0;">
                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Amount Paid:</strong> ₹${total}</p>
                </div>

                <!-- STATUS -->
                <p style="font-size:14px;">
                  Placed → Packed → Shipped → <strong style="color:#2e7d32;">Delivered</strong>
                </p>

                <!-- PRODUCTS -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
                  ${product
                    .map(
                      (item) => `
                    <tr style="border-bottom:1px solid #eee;">
                      <td width="80" style="padding:10px;">
                        <img src="${
                          item.image
                        }" width="60" style="border-radius:6px;" />
                      </td>
                      <td style="padding:10px; font-size:14px;">
                        <strong>${item.title}</strong><br/>
                        Size: ${item.size ?? "-"} | Color: ${
                        item.color ?? "-"
                      }<br/>
                        Qty: ${item.qty}
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </table>

                <!-- CTA -->
                <div style="text-align:center; margin:24px 0;">
                  <a href="http://localhost:3000/orders"
                     style="background:#2874f0; color:#fff; padding:12px 22px;
                            text-decoration:none; border-radius:6px;">
                    Manage Your Order
                  </a>
                </div>

                <p style="font-size:13px; color:#666;">
                  Thank you for shopping with <strong>Sam Store.</strong>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
