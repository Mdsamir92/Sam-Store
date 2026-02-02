"use client";

function Stepper({ step }: { step: number }) {

  const steps = ["Shopping Cart", "Shipping Address", "Payment Method"];

  return (
    <div className="flex justify-center gap-12 mb-12">
      {steps.map((label, index) => {
        const active = step === index + 1;

        return (
          <div key={label} className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold
                ${
                  active
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
            >
              {index + 1}
            </div>
            <span
              className={`mt-2 text-sm font-medium
                ${active ? "text-gray-900" : "text-gray-400"}`}
            >
              {label}
            </span>
            {active && <div className="w-20 h-0.5 bg-gray-900 mt-2" />}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
