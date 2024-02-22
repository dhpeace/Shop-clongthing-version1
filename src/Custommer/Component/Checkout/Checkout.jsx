// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./checkout.css";

function Checkout() {
  return (
    <div className="checkout-wrapper py-5 home-wrapper-2">
      <div className="row">
        <div className="col-7">
          <div className="checkout-left-data">
            <h3 className="website-name">Xác thực đặt hàng</h3>
            <nav
              style={{ "--bs-breadcrumb-divider": ">" }}
              aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link className="total-price" to="/cart">
                    Giỏ hàng
                  </Link>
                </li>
                &nbsp;/&nbsp;
                <li
                  className="breadcrumb-ite total-price active"
                  aria-current="page">
                  Thông tin xác thực
                </li>
                &nbsp;/&nbsp;
                <li className="breadcrumb-item total-price active">Gửi hàng</li>
                &nbsp;/
                <li
                  className="breadcrumb-item total-price active"
                  aria-current="page">
                  Thanh toán
                </li>
              </ol>
            </nav>
            <div className="d-flex gap-30 information-user-checkout">
              <h4 className="title-total">
                Thông tin người tham gia chiến dịch
              </h4>
              <div className="user-details-total">
                <p>Email: TuzgBach (tungbach.tts@gmail.com)</p>
                <p>Số điện thoại: 0989741798</p>
                <p>Địa chỉ nhận hàng: Chưa cập nhật</p>
                <p>Chiến dịch tham gia: Lần thứ 4</p>
              </div>
            </div>
            <h4 className="address-payment">Địa chỉ nhận hàng của bạn</h4>
            <form
              action=""
              className="d-flex gap-15 flex-wrap justify-content-between">
              <div className="w-100">
                <select
                  name=""
                  className="form-control-checkout form-select-checkout"
                  id="">
                  <option value="" selected disabled>
                    Chọn quốc gia
                  </option>
                  <option value="hcm">Thành phố Hồ Chí Minh</option>
                  <option value="bd">Bình Dương</option>
                  <option value="tn">Tây Ninh</option>
                </select>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  className="form-control-checkout"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Họ của bạn"
                  className="form-control-checkout"
                />
              </div>
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Địa chỉ giao hàng"
                  className="form-control-checkout"
                />
              </div>
              <div className="w-100">
                <input
                  type="text"
                  placeholder="Số nhà, chung cư, căn hộ"
                  className="form-control-checkout"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Thành phố"
                  className="form-control-checkout"
                />
              </div>
              <div className="flex-grow-1">
                <select
                  name=""
                  className="form-control-checkout form-select-checkout"
                  id="">
                  <option value="" selected disabled>
                    Chọn quận
                  </option>
                  <option value="hcm">Quận 1</option>
                  <option value="hcm">Quận 2</option>
                  <option value="hcm">Quận 3</option>
                  <option value="hcm">Quận 4</option>
                  <option value="hcm">Quận 5</option>
                  <option value="hcm">Quận 6</option>
                  <option value="hcm">Quận 7</option>
                  <option value="hcm">Quận 8</option>
                  <option value="hcm">Quận 9</option>
                  <option value="hcm">Quận 10</option>
                  <option value="hcm">Quận 11</option>
                  <option value="hcm">Quận 12</option>
                </select>
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Số Zip"
                  className="form-control-checkout"
                />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/cart" className="return-payment-cart">
                    <BiArrowBack className="me-2" />
                    Quay về giỏ hàng
                  </Link>
                  <Link to="/payment/:orderId" className="button-checkout">
                    Đặt chiến dịch
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-5">
          <div className="border-bottom-total">
            <div className="d-flex gap-10 mb-2 align-align-items-center">
              <div className="last-payment d-flex ">
                <div className="last-payment position-relative">
                  <span
                    style={{ top: "10px", right: "8px" }}
                    className="badge bg-secondary text-white rounded-circle p-2 position-absolute">
                    1
                  </span>
                  <img
                    className="img-last-payment"
                    src="https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/November2023/AD001.s2.6_37.jpg"
                    alt="payment-last-product"
                  />
                </div>
                <div className="last-total-price">
                  <h5 className="total-title">
                    Quần Shorts Nam Gym Essentials
                  </h5>
                  <p>Size: M</p>
                  <span>Price: 100.000</span>
                  <p>Số lượng: 1</p>
                  <p>Khuyến mãi: 10%</p>
                  <p>Tặng kèm: Vớ 2 đôi</p>
                  <textarea
                    className="input-last-payment"
                    name="notes_order"
                    id="notes_order"
                    placeholder="Nhập ghi chú cho đơn hàng (nếu có)"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="border-bottom-calculator py-5">
            <div className="calculator-firt d-flex">
              <p className="calculator-title">Đơn hàng</p>
              <p className="calculator-total">
                15,000 <b>vnđ</b>
              </p>
            </div>
            <div className="d-flex calculator-ship">
              <p className="calculator-ship-title">Phí ship</p>
              <p className="calculator-total">
                5,000 <b>vnđ</b>
              </p>
            </div>
            <div className="d-flex calculator-tax">
              <p className="calculator-tax-title">Thuế VAT</p>
              <p className="calculator-tax-total">10%</p>
            </div>
          </div>
          <div className="d-flex calculator-last">
            <p className="calculator-last-title">Tổng đơn hàng</p>
            <p className="calculator-last-total">
              20,000 <b>vnđ</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
