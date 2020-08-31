import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(title: string, value: number, type: 'income' | 'outcome'): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if ((balance.total - value < 0)&&(type==='outcome'))
      throw Error("Balance can not be negative");
    return this.transactionsRepository.create(title, value, type);
  }
}

export default CreateTransactionService;
