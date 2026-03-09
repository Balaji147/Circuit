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

ALTER TYPE task_priority RENAME VALUE 'LOW' TO 'low';
ALTER TYPE task_priority RENAME VALUE 'MEDIUM' TO 'medium';
ALTER TYPE task_priority RENAME VALUE 'HIGH' TO 'high';

ALTER TYPE task_status RENAME VALUE 'TODO' TO 'todo';
ALTER TYPE task_status RENAME VALUE 'IN_PROGRESS' TO 'in_progress';
ALTER TYPE task_status RENAME VALUE 'DONE' TO 'done';

SELECT enumlabel
FROM pg_enum
WHERE enumtypid = 'task_status'::regtype;