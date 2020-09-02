//import com.App;
//import com.aa.entity.User;
//import com.aa.mapper.UserMapper;
//import com.baomidou.mybatisplus.core.metadata.IPage;
//import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
//import org.junit.Assert;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.junit4.SpringRunner;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = App.class)
//public class MyTest {
//
//    @Autowired
//    UserMapper userMapper;
//
//    @Test
//    public void test(){
//        IPage<User> userIPage = userMapper.selectPage(new Page<>(2, 1), null);
//        System.out.println(userIPage.getRecords());
//        Assert.assertEquals(1,userIPage.getSize());
//        System.out.println(userIPage.getRecords().size());
//    }
//
//}
