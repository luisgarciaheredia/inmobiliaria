<?php

class Reports
{

    private $connection;
    private $project_id;
    private $date;
    private $reports;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_project_id($project_id)
    {
        $this->project_id = $project_id;
    }

    public function set_date($date)
    {
        $this->date = $date;
    }

    public function lots_and_orders_by_project()
    {
        try {
            $sql = "
                (
                    select
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        orders.price,
                        orders.type,
                        orders.date,
                        count(payments.id) as payments_count,
                        owners.name,
                        owners.phone,
                        sum(payments.amount_in_progress) as amount_in_progress

                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    left join payments
                        on payments.order_id = orders.id
                    where 
                        projects.id =  $this->project_id
                        and orders.date <= '$this->date'
                    group by block, lot
                )
                union all
                (
                    select
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        orders.price,
                        orders.type,
                        orders.date,
                        null as payments_count,
                        owners.name,
                        owners.phone,
                        null as amount_in_progress
                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    where 
                        projects.id =  $this->project_id
                        and orders.date is null
                )";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function orders_and_payments_by_project()
    {
        try {
            $today = date("Y-m-d");
            $sql = "                
                    select      
                        projects.id,
                        projects.project,
                        lots.block, 
                        lots.lot,
                        owners.name,
                        owners.phone,
                        payments.type,
                        payments.number,
                        payments.due_date,
                        payments.amount_in_progress,
                        payments.amount - payments.amount_in_progress as balance,
                        case 
                            when payments.amount - payments.amount_in_progress = 0 then 'Pagado' 
                            when '$today' > payments.due_date then 'Vencido' 
                            else 'Pendiente' 
                        end as stage
                    from
                        projects
                    left join lots
                        on lots.project_id = projects.id
                    left join orders
                        on orders.lot_id = lots.id
                    left join owners
                        on owners.id = orders.owner_id
                    left join payments
                        on payments.order_id = orders.id
                    where 
                        projects.id =  $this->project_id
                        and orders.date <= '$this->date'
                        and payments.amount - payments.amount_in_progress != 0
                        and payments.due_date != '0000-00-00'
                        ";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }
}
