import delay from './delay';

const payments = [
    {
        id: "1",
        count: "$20",
        title: "First Payment",
        category: "Food"
    },
    {
        id: "2",
        count: "$1000",
        title: "Second Payment",
        category: "Service"
    },
    {
        id: "3",
        count: "$2",
        title: "Third Payment",
        category: "Medicine"
    },
    {
        id: "4",
        count: "$234",
        title: "Fourth Payment",
        category: "Vacation"
    },
    {
        id: "5",
        count: "$30",
        title: "Fifth Payment",
        category: "eBay"
    }
];

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (payment) => {
    return replaceAll(payment.title, ' ', '-');
};

class PaymentApi {
    static getAllPayments() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], payments));
            }, delay);
        });
    }

    static savePayment(payment) {
        payment = Object.assign({}, payment);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const minPaymentTitleLength = 1;
                if (payment.title.length < minPaymentTitleLength) {
                    reject(`Title must be at least ${minPaymentTitleLength} characters.`);
                }

                if (payment.id) {
                    const existingPaymentIndex = payments.findIndex(a => a.id === payment.id);
                    payments.splice(existingPaymentIndex, 1, payment);
                } else {
                    payment.id = generateId(payment);
                    payments.push(payment);
                }

                resolve(payment);
            }, delay);
        });
    }

    static deletePayment(paymentId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const indexOfPaymentToDelete = payments.findIndex(payment => payment.id === paymentId);
                payments.splice(indexOfPaymentToDelete, 1);
                resolve();
            }, delay);
        });
    }


    static getPayment(paymentId) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const existingPaymentIndex = payments.findIndex(payment => payment.id === paymentId);

                const paymentFound = Object.assign({}, payments[existingPaymentIndex]);

                resolve(paymentFound);

            }, delay);
        });
    }

}

export default PaymentApi;
