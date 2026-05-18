CREATE TYPE task_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH');
CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'DONE');

CREATE TABLE circuit_task_info (
	circuit_task_info_id bigint generated always as identity primary key,
	task_title text not null,
	task_description text null,
	task_priority_level task_priority default 'LOW',
	task_status task_status defau
)

select * from circuit_task_info

SELECT COUNT(*) AS overdue_count
FROM circuit_task_info
WHERE due_date < NOW();

