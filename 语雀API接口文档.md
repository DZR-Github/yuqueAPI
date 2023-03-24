# 语雀API接口文档

> [Github地址](https://github.com/PacificD/class-schedule-backend-dist)

## API V1 接口说明：

- 接口基准地址：`http://localhost:8081`
- 服务端对前端所有域开放权限
- API V1 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头headers中添加 `token` 字段提供 token 令牌
- 本API文档出现的请求参数默认不能为空
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON



## 启动：

> 1. 进入文件内的`app`文件夹目录打开vscode终端或git bash终端或其他终端
> 2. 执行： `npm install`
> 3. 依赖安装完毕后，执行：`node main.js`
> 4. 打开浏览器，进入 `http://localhost:8081`，看到网页数据，则证明后端服务启动成功
> 5. 所有的API请求都是基于 `http://localhost:8081`为根地址，如用户注册请求：`http://localhost:8081/user/register`



## 请求示例：

### 1. 注册

- JavaScript中的ajax代码：

  - ```javascript
    var XHR = new XMLHttpRequest()
    //以POST方法发送请求，第二个参数为请求地址
    XHR.open("POST","http://localhost:8081/user/register",true)
    //设置请求头
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    //用'&’隔开参数
    XHR.send("username=user&password=123456") 
    //打印后端返回结果的对象
    console.log(JSON.parse(XHR.responseText))
    ```
    
  - 在浏览器F12控制台可以看到后端返回的消息

### 2. 请求需要权限的接口（带上token）

- 注册成功后，登录获取token

  - 登录成功后的返回结果：

    ```json
    {
        "statusCode": 200,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0"
        },
        "message": "success"
    }
    ```

- 这里使用获取用户小记为例子，

  - 在所有需要权限的接口中，在请求头headers中加上token字段。如果没有带上token，会显示状态码为401的错误结果：`Unauthorized`

  - ```javascript
    var XHR = new XMLHttpRequest()
    XHR.open("GET","http://localhost:8081/mininotes",true)
    XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    //在请求头设置TOKEN
    XHR.setRequestHeader("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0")
    XHR.send()
    console.log(JSON.parse(XHR.responseText))
    ```

- 返回结果：

  - ```json
    {
        "statusCode": 200,
        "data": {
            "userId": "757a7970-c954-11ed-b135-f306cdb9aa78",
            "data": [
                {
                    "content": "小记C",
                    "createTime": "03-20  17:00",
                    "notesId": 0,
                    "tag": "C"
                },
                {
                    "content": "小记D",
                    "createTime": "03-20  22:00",
                    "notesId": 2,
                    "tag": "D"
                },
                {
                    "content": "小记A",
                    "createTime": "03-20  20:00",
                    "notesId": 1,
                    "tag": "A"
                },
                {
                    "content": "小记B",
                    "createTime": "03-20  08:00",
                    "notesId": 4,
                    "tag": "B"
                }
            ]
        },
        "message": "success"
    }
    ```

### 3. restful请求

- 这里用删除一个小记接口为例子

- restful请求：

  - 请求路径：`/mininotes/：notesId`
  - 如删除小记请求：`/mininotes/1`，请求方法为`DELETE`，在路径后加上小记的notesId
  - 类似这种的，称之为restful API

- ```javascript
  var XHR = new XMLHttpRequest()
  XHR.open("DELETE","http://localhost:8081/mininotes/1",true)
  XHR.setRequestHeader("Content-type","application/x-www-form-urlencoded")
  XHR.setRequestHeader("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ1YmQxNjIwLWFjNGEtMTFlYy1iMDRkLTBiZjgxOWJiZmFhYyIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjE5NzgwLCJleHAiOjE2NDgzMDYxODB9.NdI_6AlCdW737yznOp3xsg0DyBZhcqGluGdE8gGQGH0")
  XHR.send()
  console.log(JSON.parse(XHR.responseText))
  ```

- 返回结果：

  - ```json
    {
        "statusCode": 200,
        "data": "删除成功",
        "message": "success"
    }
    ```



## 支持的请求方法：

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。



## 通用返回状态说明：

| *状态码* | *含义*                | *说明*                             |
| -------- | --------------------- | ---------------------------------- |
| 200      | OK                    | 请求成功                           |
| 201      | CREATED               | 创建成功                           |
| 204      | DELETED               | 删除成功                           |
| 400      | BAD REQUEST           | 请求的语法错误或者包含不支持的参数 |
| 401      | UNAUTHORIZED          | 未授权，请求要求用户的身份认证     |
| 403      | FORBIDDEN             | 被禁止访问                         |
| 404      | NOT FOUND             | 请求的资源不存在                   |
| 500      | INTERNAL SERVER ERROR | 服务器内部错误                     |



## API列表：

### 1. 用户模块

#### 1.1 注册接口

- 请求路径：`/user/register`

- 请求方法：`post`

- 是否需要token：否

- 请求参数：

  - | **参数名** | **参数说明** | 备注               |
    | ---------- | ------------ | ------------------ |
    | username   | 用户名       | 长度在2~16字符之间 |
    | password   | 密码         | 长度在6~16字符之间 |

- 响应参数：

  - | **参数名** | **参数说明** | 备注 |
    | ---------- | ------------ | ---- |
    | id         | 用户ID       |      |
    | username   | 用户名       |      |

- 响应数据：

  - ```json
    {
        "statusCode": 201,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user"
        },
        "message": "success"
    }
    ```

#### 1.2 登录接口

- 请求路径：`/user/login`

- 请求方法：`post`

- 是否需要token：否

- 请求参数：

  - | **参数名** | **参数说明** | 备注                         |
    | ---------- | ------------ | ---------------------------- |
    | username   | 用户名       | 不能为空，长度在2~16字符之间 |
    | password   | 密码         | 不能为空，长度在6~16字符之间 |

- 响应参数：

  - | **参数名** | **参数说明** | 备注                                                   |
    | ---------- | ------------ | ------------------------------------------------------ |
    | id         | 用户ID       |                                                        |
    | username   | 用户名       |                                                        |
    | token      | 令牌         | 用户身份的凭证，在请求需要权限的接口时需要在请求头加上 |

- 响应数据：

  - ```json
    {
        "statusCode": 200,
        "data": {
            "id": "e1e15920-ac3c-11ec-91fc-dd21b53c1b29",
            "username": "user",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUxZTE1OTIwLWFjM2MtMTFlYy05MWZjLWRkMjFiNTNjMWIyOSIsInVzZXJOYW1lIjoidXNlciIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjQ4MjEzOTE0LCJleHAiOjE2NDgzMDAzMTR9.04KvKYNZAmxX8w-85MO40VaJscDxfMFPZ-F0pNLEUPQ"
        },
        "message": "success"
    }
    ```



### 2. 文章模块

#### 2.1 获取批量文章

- 请求路径：`/article/:quantity`

- 请求方法：Get

- 是否需要token：否

- 请求参数：

  | 参数名   | 参数说明       | 备注                                                         |
  | -------- | -------------- | ------------------------------------------------------------ |
  | quantity | 文章数（1~10） | 在请求url处加上，如请求5篇文章："http://localhost:8081/article/5" |

- 响应参数：

  | 参数名   | 参数说明                 | 备注 |
  | -------- | ------------------------ | ---- |
  | articles | 包含quantity篇文章的数组 |      |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "articles": [
            {
                "title": "2022 年的十大生物学突破",
                "content": "许多论文需要一年多的时间才能发表，在期刊官僚的严密监视下，被搁置在数字化的边缘。漫长的等待可能也不值得——同行评审通常是无用的，而且很多糟糕的科学无论如何都能通过。许多伟大的想法也从来没有发表在论文上，因为，好吧，他们从来没有得到资助。NIH 拨款审查非常不一致。如果您向 43 位不同的审稿人提供 25 份拨款建议，他们的评定者间可靠性（衡量分数一致性的指标）基本上为零，即使拨款已经获得资金和先前评审小组的高分！给予相同审稿人的无资金资助与有资金资助的资助得分一样。",
                "articleId": 0,
                "time": "03-15 10:29",
                "imgUrl": "https://gitee.com/web-zrd/imgs/raw/master/00.jpg",
                "headImgUrl": "https://cdn.nlark.com/yuque/0/2018/jpeg/126032/1526460304504-avatar/f6903e58-a5ec-4c79-9d61-f8c8e0e3f83c.jpeg",
                "userName": "章鱼猫先生"
            }
        ]
    },
    "message": "success"
}
```



#### 2.2  根据articleId获取文章

- 请求路径：`http://localhost:8081/article/search/:articleId`

- 请求方法：Get

- 是否需要token：否

- 请求参数：

  | 参数名    | 参数说明 | 备注            |
  | --------- | -------- | --------------- |
  | articleId | 文章id   | 加在请求url后面 |

- 响应参数：

  | 参数名  | 参数说明     | 备注 |
  | ------- | ------------ | ---- |
  | Article | 对应文章内容 |      |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "Article": {
            "title": "潮流最前端第 103 期：GPT-4 震撼发布",
            "content": "TypeScript’s Migration to Modules https://devblogs.microsoft.com/typescript/typescripts-migration-to-modules/One of the most impactful things we’ve worked on in TypeScript 5.0 isn’t a feature, a bug fix, or a data structure optimization. Instead, it’s an infrastructure change. In TypeScript 5.0, we restructured our entire codebase to use ECMAScript modules, and switched to a newer emit target.",
            "articleId": 1,
            "time": "03-15 10:53",
            "imgUrl": "https://gw.alipayobjects.com/zos/k/qm/tQRoY1.jpg",
            "headImgUrl": "https://cdn.nlark.com/yuque/0/2020/png/84615/1591495228109-avatar/28174685-9a42-4d00-b447-9e77b55df1c9.png?x-oss-process=image%2Fresize%2Cm_fill%2Cw_328%2Ch_328%2Fformat%2Cpng",
            "userName": "侑夕"
        }
    },
    "message": "success"
}
```



### 3. 小记模块

#### 3.1 创建小记

- 请求路径：`http://localhost:8081/mininotes`

- 请求方法：Post

- 是否需要token：是

- 请求参数：

  | 参数名     | 参数说明 | 备注                                                         |
  | ---------- | -------- | ------------------------------------------------------------ |
  | content    | 小记内容 |                                                              |
  | createTime | 创建时间 | 格式：xx-xx  xx:xx 如"03-20  20:00"                          |
  | notesId    | 小记id   | ==number类型==，且每篇小记的notesId不能一样，可以使用时间戳作为notesId |
  | tag        | 小记标签 | 可选参数                                                     |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 201,
    "data": {
        "message": "新增小记成功！"
    },
    "message": "success"
}
```



#### 3.2 获取用户小记

- 请求路径：`http://localhost:8081/mininotes`

- 请求方法：Get

- 是否需要token：是

- 请求参数：无

- 响应参数：

  | 参数名 | 参数说明                     | 备注                               |
  | ------ | ---------------------------- | ---------------------------------- |
  | data   | 包含该用户创建的所有小记内容 | 初始为空，先创建小记后才能拿到数据 |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "userId": "757a7970-c954-11ed-b135-f306cdb9aa78",
        "data": [
            {
                "content": "小记C",
                "createTime": "03-20  17:00",
                "notesId": 0,
                "tag": "C"
            },
            {
                "content": "小记D",
                "createTime": "03-20  22:00",
                "notesId": 2,
                "tag": "D"
            },
            {
                "content": "小记A",
                "createTime": "03-20  20:00",
                "notesId": 1,
                "tag": "A"
            },
            {
                "content": "小记B",
                "createTime": "03-20  08:00",
                "notesId": 4,
                "tag": "B"
            }
        ]
    },
    "message": "success"
}
```



#### 3.3 更新小记

- 请求路径：`http://localhost:8081/mininotes`

- 请求方法：Patch

- 是否需要token：是

- 请求参数：

  - | 参数名     | 参数说明 | 备注                                                         |
    | ---------- | -------- | ------------------------------------------------------------ |
    | content    | 小记内容 |                                                              |
    | createTime | 创建时间 | 格式：xx-xx  xx:xx ，如"03-20  20:00"                        |
    | notesId    | 小记id   | ==number类型==，且每篇小记的notesId不能一样，可以使用时间戳作为notesId |
    | tag        | 小记标签 | 可选参数                                                     |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "小记更新成功！",
    "message": "success"
}
```



#### 3.4 删除小记

- 请求路径：`http://localhost:8081/mininotes/:notesId`

- 请求方法：Delete

- 是否需要token：是

- 请求参数：

  | 参数名  | 参数说明         | 备注                |
  | ------- | ---------------- | ------------------- |
  | notesId | 需要删除的小记id | 添加在请求url的后面 |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "删除成功！",
    "message": "success"
}
```



### 4、收藏模块

#### 4.1 收藏文章

- 请求路径：`http://localhost:8081/collection/:articleId`

- 请求方法：Post

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明         | 备注                |
  | --------- | ---------------- | ------------------- |
  | articleId | 需要收藏的文章id | 添加在请求url的后面 |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 201,
    "data": "添加收藏成功！",
    "message": "success"
}
```

#### 4.2 取消收藏

- 请求路径：`http://localhost:8081/collection/:articleId`

- 请求方法：Delete

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明             | 备注                |
  | --------- | -------------------- | ------------------- |
  | articleId | 需要取消收藏的文章id | 添加在请求url的后面 |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "取消收藏成功！",
    "message": "success"
}
```

#### 4.3 获取用户的收藏列表

- 请求路径：`http://localhost:8081/collection`

- 请求方法：Get

- 是否需要token：是

- 请求参数：

- 响应参数：

  | 参数名      | 参数说明                 | 备注 |
  | ----------- | ------------------------ | ---- |
  | collections | 包含用户收藏的文章id数组 |      |

- 响应数据示例：

```
{
    "statusCode": 200,
    "data": {
        "userId": "c1a7b1b0-c494-11ed-ab40-674c0c36a5c7",
        "collections": [
            1,
            3,
            5
        ]
    },
    "message": "success"
}
```



### 5、评论模块

#### 5.1 获取文章评论

- 请求路径：`http://localhost:8081/comments/:articleId`

- 请求方法：Get

- 是否需要token：否

- 请求参数：

  | 参数名    | 参数说明 | 备注              |
  | --------- | -------- | ----------------- |
  | articleId | 文章id   | 添加在请求url后面 |

- 响应参数：

  | 参数名   | 参数说明           | 备注 |
  | -------- | ------------------ | ---- |
  | comments | 包含评论信息的数组 |      |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "articleId": 0,
        "comments": [
            {
                "nickname": "vivid",
                "headImgUrl": "http://localhost:8081/userImg.png",
                "content": "good!",
                "time": "03-20 18:00"
            },
            {
                "nickname": "小君",
                "headImgUrl": "http://localhost:8081/userImg.png",
                "content": "very good!",
                "time": "03-21 15:00"
            }
        ]
    },
    "message": "success"
}
```

#### 5.2 添加评论

- 请求路径：`http://localhost:8081/comments`

- 请求方法：Post

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明 | 备注                                  |
  | --------- | -------- | ------------------------------------- |
  | articleId | 文章id   |                                       |
  | comments  | 评论内容 |                                       |
  | time      | 评论时间 | 格式：xx-xx  xx:xx ，如"03-20  20:00" |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "评论成功!",
    "message": "success"
}
```



### 6、点赞模块

#### 6.1 点赞

- 请求路径：`http://localhost:8081/favour/:articleId`

- 请求方法：Post

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明 | 备注              |
  | --------- | -------- | ----------------- |
  | articleId | 文章id   | 添加在请求url后面 |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "点赞成功！",
    "message": "success"
}
```

#### 6.2 取消点赞

- 请求路径：`http://localhost:8081/favour/:articleId`

- 请求方法：Delete

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明 | 备注              |
  | --------- | -------- | ----------------- |
  | articleId | 文章id   | 添加在请求url后面 |

- 响应参数：无

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": "取消点赞成功！",
    "message": "success"
}
```

#### 6.3 获取个人点赞状态

- 请求路径：`http://localhost:8081/favour/mine/:articleId`

- 请求方法：Get

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明 | 备注              |
  | --------- | -------- | ----------------- |
  | articleId | 文章id   | 添加在请求url后面 |

- 响应参数：

  | 参数名 | 参数说明                          | 备注 |
  | ------ | --------------------------------- | ---- |
  | status | 返回true或者false，true代表已点赞 |      |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "status": true
    },
    "message": "success"
}
```

#### 6.4 获取文章点赞量

- 请求路径：`http://localhost:8081/favour/:articleId`

- 请求方法：Get

- 是否需要token：是

- 请求参数：

  | 参数名    | 参数说明 | 备注              |
  | --------- | -------- | ----------------- |
  | articleId | 文章id   | 添加在请求url后面 |

- 响应参数：

  | 参数名       | 参数说明 | 备注 |
  | ------------ | -------- | ---- |
  | likeQuantity | 点赞量   |      |

- 响应数据示例：

```json
{
    "statusCode": 200,
    "data": {
        "likeQuantity": 11
    },
    "message": "success"
}
```

