CREATE SCHEMA `member-reward` ;

CREATE TABLE `member-reward`.`members` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `member_name` VARCHAR(100) NOT NULL,
  `member_email` VARCHAR(100) NOT NULL,
  `member_contact` VARCHAR(45) NULL,
  `member_created_date` DATETIME NULL,
  `member_updated_date` DATETIME NULL,
  `member_created_by` VARCHAR(20) NULL,
  `member_updated_by` VARCHAR(20) NULL,
  PRIMARY KEY (`member_id`));

CREATE TABLE `member-reward`.`rewards` (
  `reward_id` INT NOT NULL AUTO_INCREMENT,
  `reward_name` VARCHAR(100) NOT NULL,
  `reward_created_date` DATETIME NULL,
  `reward_updated_date` DATETIME NULL,
  `reward_created_by` VARCHAR(20) NULL,
  `reward_updated_by` VARCHAR(20) NULL,
  PRIMARY KEY (`reward_id`));

CREATE TABLE `member-reward`.`member_rewards` (
  `member_id` INT NOT NULL,
  `reward_id` INT NOT NULL,
  `member_rewards_created_date` DATETIME NULL,
  `member_rewards_updated_date` DATETIME NULL,
  `member_rewards_created_by` VARCHAR(20) NULL,
  `member_rewards_updated_by` VARCHAR(20) NULL,
  PRIMARY KEY (`member_id`, `reward_id`));

ALTER TABLE `member-reward`.`member_rewards` 
ADD CONSTRAINT `member_rewards_member_id`
  FOREIGN KEY (`member_id`)
  REFERENCES `member-reward`.`members` (`member_id`);

ALTER TABLE `member-reward`.`member_rewards` 
ADD INDEX `member_reward_reward_id_idx` (`reward_id` ASC);
ALTER TABLE `member-reward`.`member_rewards` 
ADD CONSTRAINT `member_reward_reward_id`
  FOREIGN KEY (`reward_id`)
  REFERENCES `member-reward`.`rewards` (`reward_id`);
