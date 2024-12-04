Github 仓库地址：[https://github.com/michalyao/springboot-turorial](https://github.com/michalyao/springboot-turorial)

## Hutool Maven 配置
```xml
<dependency>
  <groupId>cn.hutool</groupId>
  <artifactId>hutool-core</artifactId>
  <version>5.8.26</version>
</dependency>
```

  


## Docker 启动 Mysql 命令
docker 桌面端下载链接：[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

```bash
docker run --name mysql-student -p 3306:3306  -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```

## Student 库表初始化
```plsql
CREATE DATABASE student
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

CREATE TABLE student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  birthday date NOT NULL
);
```

## SpringBoot 数据库配置
  


```properties
server.port=8080
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.url=jdbc:mysql://localhost:3306/student?useSSL=false&useUnicode=true&characterEncoding=UTF-8
spring.datasource.type=com.mysql.cj.jdbc.MysqlConnectionPoolDataSource
```

  


## MyBatisPlus maven配置
```xml
<dependency>
  <groupId>com.baomidou</groupId>
  <artifactId>mybatis-plus-boot-starter</artifactId>
  <version>3.5.5</version>
</dependency
```

  


## MyBatisPlus mapperScan 配置 & 容器 Bean 扫描代码
```java
@SpringBootApplication
@MapperScan("com.example.demo.student.dal")
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
        return args -> {

            System.out.println("容器中注入的Bean有 :");

            String[] beanNames = ctx.getBeanDefinitionNames();
            Arrays.sort(beanNames);
            for (String beanName : beanNames) {
                System.out.println(beanName);
            }

        };
    }
}
```

  
  


> 来自: [SpringBoot 简明教程代码清单](https://www.yuque.com/yuqueyonghutm7sin/rg4ok9/mz6aszg9ndnolotr?singleDoc#%20%E3%80%8ASpringBoot%20%E7%AE%80%E6%98%8E%E6%95%99%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%B8%85%E5%8D%95%E3%80%8B)
>

