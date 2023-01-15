import React, { useState, useEffect } from 'react'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from '../../helper/axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, } from 'recharts';
import ManagerInformation from './ManagerInformation';
function Statiscal() {
  const dispatch = useDispatch();
  const [toggleStateAddClass, setToggleStateAddClass] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [analytic, setAnalytic] = useState([]);
  const toggleTabAddClass = (index) => {

    setToggleStateAddClass(index);
  };
  useEffect(() => {
    if (searchParams.get("class_id")) {

      async function fetchData(program_id) {
        if (program_id) {

          let programCategoryDetailRes = await axios.get(`/teacher/analytics?class_id=${program_id}`);
          if (programCategoryDetailRes.data.code === 200) {
            let data = [];
            data.push(programCategoryDetailRes.data.data)


            setAnalytic(data);
          }
        }
        // ...
      }

      fetchData(searchParams.get("class_id"));

    }
  }, [searchParams.get("class_id")]);
  const data = [
    {
      name: 'Tuần 1',
      uv: 400,
      pv: 240,
      amt: 240,
    },
    {
      name: 'Tuần 2',
      uv: 300,
      pv: 139,
      amt: 221,
    },
    {
      name: 'Tuần 3',
      uv: 200,
      pv: 980,
      amt: 229,
    },
    {
      name: 'Tuần 4',
      uv: 278,
      pv: 390,
      amt: 200,
    },
    {
      name: 'Tuần 5',
      uv: 189,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Tuần 6',
      uv: 239,
      pv: 380,
      amt: 250,
    },
    {
      name: 'Tuần 7',
      uv: 349,
      pv: 430,
      amt: 2100,
    },
    {
      name: 'Tuần 8',
      uv: 449,
      pv: 530,
      amt: 310,
    },
    {
      name: 'Tuần 9',
      uv: 549,
      pv: 330,
      amt: 310,
    },
  ];
  return (
    <div className='infomation_detail_class_content'>
      <div className='infomation_detail_class_header1 '>
        <div className="bloc-tabs_detail_class">
          <div
            className={toggleStateAddClass === 0 ? "tabs_detail_class active_tabs_detail_class1" : "tabs_detail_class"}
            onClick={() => toggleTabAddClass(0)}
          >
            Tổng quan
          </div>
          <div
            className={toggleStateAddClass === 1 ? "tabs_detail_class active_tabs_detail_class2" : "tabs_detail_class"}
            onClick={() => toggleTabAddClass(1)}
          >
            Thông tin sinh viên
          </div>
        </div>

      </div>
      {
        toggleStateAddClass === 0 && analytic ? <div className='content_statiscal'>
          <div className='header_statiscal'>
            <div className='item_content_statiscal'>
              <div className='icon_statiscal'>
                <div className='icon_stat_praent'>
                  <SupervisedUserCircleIcon className='icon_stat' />
                </div>

              </div>
              <div className='content_icon_statiscal'>
                <div className='label_icon_statiscal'>Tổng số sinh viên</div>
                <div className='count_icon_statiscal'>{analytic[0] && analytic[0].amount_student ? analytic[0].amount_student : 0} sinh viên</div>
              </div>
            </div>
            <div className='item_content_statiscal content_header1' >
              <div className='icon_statiscal'>
                <div className='icon_stat_praent'>
                  <SupervisedUserCircleIcon className='icon_stat' />
                </div>

              </div>
              <div className='content_icon_statiscal'>
                <div className='label_icon_statiscal'>Tổng chương trình</div>
                <div className='count_icon_statiscal'>{analytic[0] && analytic[0].amount_program ? analytic[0].amount_program : 0}  chương trình</div>
              </div>
            </div>
            <div className='item_content_statiscal content_header2'>
              <div className='icon_statiscal'>
                <div className='icon_stat_praent'>
                  <SupervisedUserCircleIcon className='icon_stat' />
                </div>

              </div>
              <div className='content_icon_statiscal '>
                <div className='label_icon_statiscal'>Tổng số bài học</div>
                <div className='count_icon_statiscal'>{analytic[0] && analytic[0].amount_lesson ? analytic[0].amount_lesson : 0}  bài học</div>
              </div>
            </div>
            <div className='item_content_statiscal content_header3' >
              <div className='icon_statiscal'>
                <div className='icon_stat_praent'>
                  <SupervisedUserCircleIcon className='icon_stat' />
                </div>

              </div>
              <div className='content_icon_statiscal'>
                <div className='label_icon_statiscal'>Tổng số hoạt động</div>
                <div className='count_icon_statiscal'>{analytic[0] && analytic[0].amount_task ? analytic[0].amount_task : 0}  hoạt động</div>
              </div>
            </div>
          </div>
          <div className='content_analytics'>
            <div className='analytics_time_system'>

              <p style={{ textAlign: "center", fontSize: "18px", color: "#385cce", marginTop: "5px" }}>Thống kê thời gian sử dụng hệ thống.</p>

              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={700}
                  data={data}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className='analytics_student_cheft'>
              <div className='header_student_cheft'>
                <div className='label_cheft'>
                  Sinh viên nổi bật
                </div>
                <div className='icon_student_cheft'>
                  H
                </div>
                <div className="name_student_cheft"> Nguyễn Văn H</div>
              </div>
              <div className='list_student_cheft'>
                <div className='item_cheft'>
                  <div className='left_item'>
                    <div className='child_1'>2 ND</div>
                    <div className='child_2'>T</div>
                  </div>
                  <div className='right_item'>
                    23
                  </div>
                </div>
                <div className='item_cheft'>
                  <div className='left_item'>
                    <div className='child_1'>3 RD</div>
                    <div className='child_21'>T</div>
                  </div>
                  <div className='right_item'>
                    22
                  </div>
                </div>
                <div className='item_cheft'>
                  <div className='left_item'>
                    <div className='child_1'>4 HT</div>
                    <div className='child_22'>T</div>
                  </div>
                  <div className='right_item'>
                    23
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


          : ""
      }
      {
        toggleStateAddClass === 1 && <ManagerInformation />
      }
      <div >

      </div>
    </div>

  )
}

export default Statiscal