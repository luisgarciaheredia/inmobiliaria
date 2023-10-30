<?php

class Order
{

    private $connection;
    private $table = "orders";
    private $id;
    private $lot_id;
    private $owner_id;
    private $user_id;
    private $price;
    private $type;
    private $date;
    private $comments;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_lot_id($lot_id)
    {
        $this->lot_id = $lot_id;
    }

    public function set_owner_id($owner_id)
    {
        $this->owner_id = $owner_id;
    }

    public function set_user_id($user_id)
    {
        $this->user_id = $user_id;
    }

    public function set_price($price)
    {
        $this->price = $price;
    }

    public function set_type($type)
    {
        $this->type = $type;
    }

    public function set_date($date)
    {
        $this->date = $date;
    }

    public function set_comments($comments)
    {
        $this->comments = $comments;
    }

    public function set_status($status)
    {
        $this->status = $status;
    }

    public function create()
    {
        try {
            $sql = "select * from $this->table where lot_id = '$this->lot_id'";
            $rows = $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);

            // verify unsold lot
            if (empty($rows)) {
                $now = date("Y-m-d H:i:s");
                $sql = "
                insert into $this->table
                (
                    lot_id,
                    owner_id,
                    user_id,
                    price,
                    type,
                    date,
                    comments,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->lot_id',
                    '$this->owner_id',
                    '$this->user_id',
                    '$this->price',
                    '$this->type',
                    '$this->date',
                    '$this->comments',
                    '$this->status',
                    '$now',
                    '$now'
                )";
                $this->connection->query($sql);
                return $this->connection->lastInsertId();
            } else {
                return [];
            }
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function getAll()
    {
        try {
            $sql = "
                select
                    $this->table.id,
                    $this->table.lot_id,
                    lots.project_id,
                    projects.project,
                    lots.block,
                    lots.lot,
                    $this->table.owner_id,
                    owners.name as owner,
                    $this->table.user_id,
                    users.name as user,
                    $this->table.price,
                    $this->table.type,
                    $this->table.date,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join lots
                    on $this->table.lot_id = lots.id
                inner join projects
                    on lots.project_id = projects.id
                inner join owners
                    on orders.owner_id = owners.id
                inner join users
                    on orders.user_id = users.id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function get()
    {
        try {
            $sql = "
                select
                    $this->table.id,
                    $this->table.lot_id,
                    lots.project_id,
                    projects.project,
                    lots.block,
                    lots.lot,
                    $this->table.owner_id,
                    owners.name,
                    $this->table.user_id,
                    users.name,
                    $this->table.price,
                    $this->table.type,
                    $this->table.date,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join lots
                    on $this->table.lot_id = lots.id
                inner join projects
                    on lots.project_id = projects.id
                inner join owners
                    on orders.owner_id = owners.id
                inner join users
                    on orders.user_id = users.id
                where $this->table.id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function search($query)
    {
        try {
            $sql = "
                select
                    $this->table.id,
                    $this->table.lot_id,
                    lots.project_id,
                    projects.project,
                    lots.block,
                    lots.lot,
                    $this->table.owner_id,
                    owners.name,
                    $this->table.user_id,
                    users.name,
                    $this->table.price,
                    $this->table.type,
                    $this->table.date,
                    $this->table.comments,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join lots
                    on $this->table.lot_id = lots.id
                inner join projects
                    on lots.project_id = projects.id
                inner join owners
                    on orders.owner_id = owners.id
                inner join users
                    on orders.user_id = users.id
                where 
                    projects.project like '%$query%'
                    or owners.name like '%$query%'
                    or users.name like '%$query%'";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function update()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                update $this->table
                set
                    lot_id = '$this->lot_id',
                    owner_id = '$this->owner_id',
                    user_id = '$this->user_id',
                    price = '$this->price',
                    type = '$this->type',
                    date = '$this->date',
                    comments = '$this->comments',
                    status = '$this->status',
                    updated_at = '$now'
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function delete()
    {
        try {
            $sql = "
                delete from $this->table
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }
}
