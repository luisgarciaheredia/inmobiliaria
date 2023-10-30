<?php

class Lot
{

    private $connection;
    private $table = "lots";
    private $id;
    private $project_id;
    private $block;
    private $lot;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_project_id($project_id)
    {
        $this->project_id = $project_id;
    }

    public function set_block($block)
    {
        $this->block = $block;
    }

    public function set_lot($lot)
    {
        $this->lot = $lot;
    }

    public function set_status($status)
    {
        $this->status = $status;
    }

    public function create()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                insert into $this->table
                (
                    project_id,
                    block,
                    lot,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->project_id',
                    '$this->block',
                    '$this->lot',
                    '$this->status',
                    '$now',
                    '$now'
                )";
            $this->connection->query($sql);
            return $this->connection->lastInsertId();
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
                    $this->table.project_id,
                    projects.project,
                    $this->table.block,
                    $this->table.lot,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join projects
                    on $this->table.project_id = projects.id
                order by $this->table.block, $this->table.lot";
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
                    $this->table.project_id,
                    projects.project,
                    $this->table.block,
                    $this->table.lot,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join projects
                    on $this->table.project_id = projects.id
                where $this->table.id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function getUnsold()
    {
        try {
            $sql = "
                select
                    $this->table.id,
                    $this->table.project_id,
                    projects.project,
                    $this->table.block,
                    $this->table.lot,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join projects
                    on $this->table.project_id = projects.id
                left join orders
                  on orders.lot_id = $this->table.id
                where orders.lot_id is null
                order by $this->table.block, $this->table.lot";
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
                    $this->table.project_id,
                    projects.project,
                    $this->table.block,
                    $this->table.lot,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join projects
                    on $this->table.project_id = projects.id
                where 
                    projects.project like '%$query%'
                    or block like '%$query%'
                    or lot like '%$query%'";
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
                    project_id = '$this->project_id',
                    block = '$this->block',
                    lot = '$this->lot',
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
