import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface Summarycards {
  month: string;
  balance: number;
  depositsTotal: number;
  investimentstotal: number;
  expensesTotal: number;
}

const Summarycards = async ({
  balance,
  depositsTotal,
  investimentstotal,
  expensesTotal,
}: Summarycards) => {
  return (
    <div className="space-y-6">
      {/*primeiro card*/}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="saldo"
        amount={balance}
        size="large"
      />

      {/*outros cards*/}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investimentstotal}
        />

        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />

        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  );
};

export default Summarycards;
