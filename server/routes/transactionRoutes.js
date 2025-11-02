import express from 'express';
import {
    addTransaction,
    getTransactions,
    getMonthlySummary,
    getMonthlyIncomeExpenseSummary,
    deleteTransaction // <-- import the delete function
} from '../controllers/transactionController.js';

const router = express.Router();

router.route('/')
    .post(addTransaction)
    .get(getTransactions);

router.route('/:id') // <-- route for deleting by ID
    .delete(deleteTransaction);

router.route('/summary/:year/:month')
    .get(getMonthlySummary);

router.get('/monthly-summary', getMonthlyIncomeExpenseSummary);

export default router;
