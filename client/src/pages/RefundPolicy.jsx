import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const RefundPolicy = () => {
  return (
    <>
      <Navbar />

      <section className="bg-[#f7f1e8] px-6 md:px-24 py-20 text-[#2b2b2b]">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-4xl font-serif mb-10">
            Cancellation, Refund & Exchange Policy
          </h1>

          <p className="text-base leading-relaxed mb-6">
            At <span className="font-semibold">E-KID</span>, we aim to provide
            clarity and fairness in every step of your shopping experience. You
            may cancel your order within <span className="font-medium">1 hour</span>
            of placing the order, provided it has not yet been dispatched.
            Cancellation requests must be submitted through the support email
            or app within this time frame. If the order is cancelled within
            this window, a full refund will be initiated to the original payment
            method within 48–72 hours of the cancellation being processed.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Once your order has been shipped, cancellation and refund requests
            will not be accepted under any circumstances. All items sold are
            considered final once dispatched and are governed by our return and
            exchange guidelines below.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Products may be returned or exchanged only if they are delivered
            damaged, defective, or incorrect. To qualify, you must submit a
            clear unboxing video at the time of delivery that shows the sealed
            package being opened step by step and visibly displays the damage or
            defect. If video proof is not provided, the return or exchange
            request will not be accepted. Note that images alone are not
            sufficient for approval.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Requests for exchange due to incorrect size selection may be
            considered, provided the item is unworn, unused, and returned in
            its original packaging with tags intact. Size exchanges are
            subject to stock availability. If the replacement item is not
            available, a store credit or future exchange may be offered at the
            discretion of E-KID, but a financial refund will not be issued
            solely for size mismatch.
          </p>

          <p className="text-base leading-relaxed mb-6">
            All returns or exchanges must be initiated within 
            <span className="font-medium">48 hours of delivery</span> by
            contacting our support with your order details, required proof, and
            reason for return. Once approved, items must be shipped back to us
            in original condition and packaging. Upon receipt and inspection
            of the returned item, we will notify you regarding the status of
            your exchange. Approved exchanges will be processed within 5–7
            working days, depending on stock availability.
          </p>

          <p className="text-base leading-relaxed mb-6">
            Please be aware that shipping charges are non-refundable, and any
            taxes or processing fees applied at the time of purchase may not be
            returned in exchange situations. In cases where refunds are
            authorized (for example, wrong or defective product), the amount
            will be credited to the original payment method within 5–10
            business days after quality inspection approval.
          </p>

          <p className="text-base leading-relaxed mb-6">
            E-KID reserves the right to refuse or delay refunds, exchanges, or
            cancellations in cases involving suspected misuse, repeated
            abusive cancellation behavior, or violation of policy terms. These
            terms are designed to protect both our valued customers and our
            brand integrity, while ensuring a fair and consistent shopping
            experience for everyone.
          </p>

          <p className="text-base leading-relaxed mb-6">
            For assistance, please contact our customer care team with your
            order details and supporting evidence. We are here to help ensure
            that every experience with E-KID is smooth, transparent, and
            trustworthy.
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default RefundPolicy;